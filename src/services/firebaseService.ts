import { getDatabase, ref, onValue, set, get } from "firebase/database";

interface UserParams {
  email: string;
  name: string;
  lastName: string;
}

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

export const addUserToDatabase = async ({
  email,
  name,
  lastName,
}: UserParams) => {
  const usersRef = ref(db, "users");
  let lastId = 0;

  // Fetch the last user's ID
  const snapshot = await get(usersRef);
  const users = snapshot.val();
  if (users) {
    lastId = Math.max(...Object.keys(users).map(Number));
  }

  const newUserRef = ref(db, `users/${lastId + 1}`);
  set(newUserRef, { id: lastId + 1, email, name, lastName });
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
export const fetchPosts = (callback: Function) => {
  const postsRef = ref(db, "posts");
  return onValue(postsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const updatePostById = (postId: string, updatedData: any) => {
  const postRef = ref(db, `posts/${postId}`);
  set(postRef, updatedData);
};
