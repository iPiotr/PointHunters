import { useEffect, useState } from "react";
import firebase from "firebase/app";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        const postData = [];
        snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
        setPosts(postData);
        setLoading(false);
      });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return { posts, loading };
};

export default useFetchPosts;
