import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles, PostComponent, Posts } from "../../components";
import { fetchPosts } from "../../services/firebaseService";

import styles from "./community.styles";

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Posts>({});

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      if (data) {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Optionally handle the error in the UI
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleRefresh = () => {
    loadPosts(); // Call the same function used in useEffect
  };

  const renderPosts = () =>
    Object.entries(posts).map(([postId, postInfo]) => (
      <PostComponent key={postId} postId={postId} postInfo={postInfo} />
    ));

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.topBar}>
        <Ionicons name="arrow-back" size={28} color="black" />
        <Text style={{ fontSize: 22 }}>Community</Text>
        <Ionicons
          name="refresh"
          size={28}
          color="black"
          onPress={handleRefresh}
        />
      </View>
      <ScrollView style={styles.postBoard}>
        {renderPosts()}
        <View style={styles.safeBottomArea} />
      </ScrollView>
    </View>
  );
};

export default Community;
