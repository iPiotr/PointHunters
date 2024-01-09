import {
  getDatabase,
  ref,
  onValue,
  set,
  get,
  runTransaction,
  push,
} from "firebase/database";

interface UserParams {
  email: string;
  name: string;
  lastName: string;
}

type Post = {
  who: string | any;
  comment: string;
  photo: string;
  likes: number;
};

const db = getDatabase();

// User-related functions
export const fetchUserById = (userId: number, callback: Function) => {
  const userRef = ref(db, `users/${userId}`);
  return onValue(userRef, (snapshot) => {
    const userData = snapshot.val();
    callback(userData);
  });
};

export const updateUserById = (userId: number, updatedData: any) => {
  const userRef = ref(db, `users/${userId}`);
  set(userRef, updatedData);
};

export const updateNameById = async ({ uid, name }) => {
  const newUserRef = ref(db, `users/${uid}`);
  await set(newUserRef, {
    name,
  });
};

export const addUserToDatabase = async ({
  email,
  displayName,
  uid,
  huntTimes,
  pointsCollected,
}) => {
  const newUserRef = ref(db, `users/${uid}`);
  await set(newUserRef, {
    id: uid,
    email,
    displayName,
    huntTimes,
    pointsCollected,
  });
};

export const addToAchievementTable = async ({ uid }) => {
  const newUserRef = ref(db, `user-achievements/${uid}`);
  await set(newUserRef, {});
};

export const initializeUserRewards = async (uid, initialRewards = {}) => {
  const userRewardsRef = ref(db, `rewards/${uid}`);

  await set(userRewardsRef, {
    // You can set default values or just an empty object
    ...initialRewards,
  });
};

// Achievements-related functions
export const fetchAchievements = (callback: Function) => {
  const achievementsRef = ref(db, `gameAchievements`);
  return onValue(achievementsRef, (snapshot) => {
    const data = snapshot.val();
    // Convert the data to an array if it's not undefined and is an object
    const achievementsArray =
      data && typeof data === "object" ? Object.values(data) : [];
    callback(achievementsArray);
  });
};

export const fetchUserAchievements = (uid, callback: Function) => {
  const achievementsRef = ref(db, `user-achievements/${uid}`);
  return onValue(achievementsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const updateUserAchievements = async (uid, userData, achievements) => {
  const userAchievementsRef = ref(db, `user-achievements/${uid}`);

  // Fetch current user achievements
  let userAchievements;
  const snapshot = await get(userAchievementsRef);
  if (snapshot.exists()) {
    userAchievements = snapshot.val();
  } else {
    // If no achievements exist, initialize them
    userAchievements = achievements.map(() => false);
  }

  // Update the achievements based on huntTimes
  achievements.forEach((achievement, index) => {
    if ((userData.huntTimes = achievement.amount)) {
      userAchievements[index] = true;
    }
  });

  // Update the user achievements in the database
  await set(userAchievementsRef, userAchievements);
};

// Rewards-related functions
export const fetchRewards = (callback: Function) => {
  const rewardsRef = ref(db, "rewards");
  return onValue(rewardsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const fetchNotifications = (uid, callback: Function) => {
  const achievementsRef = ref(db, `notifications/${uid}`);
  return onValue(achievementsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

const formatDate = (date) => {
  const d = new Date(date);
  const day = ("0" + d.getDate()).slice(-2);
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

// Function to add a notification with the current date
export const addNotification = (uid, content, type) => {
  const db = getDatabase();
  const notificationsRef = ref(db, `notifications/${uid}`);

  const newNotification = {
    content,
    date: formatDate(new Date()), // Add the current date
    type,
  };

  push(notificationsRef, newNotification)
    .then(() => {
      console.log("Notification added successfully");
    })
    .catch((error) => {
      console.error("Error adding notification:", error);
    });
};

// Posts-related functions
export const fetchPosts = async () => {
  const postsRef = ref(db, "posts");
  try {
    const snapshot = await get(postsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePostById = (postId: string, updatedData: any) => {
  const postRef = ref(db, `posts/${postId}`);
  set(postRef, updatedData);
};

export const incrementWin = (userId: number, score: number) => {
  const userRef = ref(db, `users/${userId}/huntTimes`);
  const userRef2 = ref(db, `users/${userId}/pointsCollected`);

  runTransaction(userRef, (currentWins) => {
    // If currentWins has never been set, initialize it to 0.
    if (currentWins === null) {
      return 1;
    } else {
      return currentWins + 1;
    }
  });

  runTransaction(userRef2, (currnetPoints) => {
    // If currentWins has never been set, initialize it to 0.
    if (currnetPoints === null) {
      return score;
    } else {
      return currnetPoints + score;
    }
  });
};

export const addNewPost = async (postData: Post) => {
  const postsRef = ref(db, "posts");

  const snapshot = await get(postsRef);
  let maxId = 0;

  // Find the max ID
  snapshot.forEach((childSnapshot) => {
    const id = childSnapshot.val().id;
    if (id > maxId) {
      maxId = id;
    }
  });

  // Increment the ID for the new post
  const newId = maxId + 1;
  const newPostRef = ref(db, `posts/${newId}`);
  set(newPostRef, { ...postData, id: newId });
};
