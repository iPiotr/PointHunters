import {
  getDatabase,
  ref,
  onValue,
  set,
  get,
  runTransaction,
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

// Achievements-related functions
export const fetchAchievements = (callback: Function) => {
  const achievementsRef = ref(db, "achievements");
  return onValue(achievementsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

// Rewards-related functions
export const fetchRewards = (callback: Function) => {
  const rewardsRef = ref(db, "rewards");
  return onValue(rewardsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
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

export const incrementWin = (userId: number) => {
  const userRef = ref(db, `users/${userId}/huntTimes`);

  runTransaction(userRef, (currentWins) => {
    // If currentWins has never been set, initialize it to 0.
    if (currentWins === null) {
      return 1;
    } else {
      return currentWins + 1;
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
