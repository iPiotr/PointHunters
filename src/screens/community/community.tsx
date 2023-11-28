import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles, PostComponent, Posts } from "../../components";
import { fetchPosts } from "../../services/firebaseService";

import styles from "./community.styles";

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Posts>({});

  useEffect(() => {
    const unsubscribe = fetchPosts((data: Posts) => {
      setPosts(data);
    });

    return () => unsubscribe();
  }, []);

  const renderPosts = () =>
    Object.entries(posts).map(([postId, postInfo]) => (
      <PostComponent key={postId} postId={postId} postInfo={postInfo} />
    ));

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.topBar}>
        <Ionicons name="arrow-back" size={28} color="black" />
        <Text style={{ fontSize: 22 }}>Community</Text>
        <Ionicons name="settings-outline" size={28} color="black" />
      </View>
      <ScrollView style={styles.postBoard}>
        {renderPosts()}
        <View style={styles.safeBottomArea} />
      </ScrollView>
    </View>
  );
};

export default Community;
