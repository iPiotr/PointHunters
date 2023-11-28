import React from "react";
import { View, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "@components";

import styles from "../screens/community/community.styles";

type Post = {
  who: string;
  comment: string;
  photo: string;
  likes: number;
};

const PostComponent: React.FC<{ postId: string; postInfo: Post }> = ({
  postId,
  postInfo,
}) => (
  <View key={postId} style={styles.postBlock}>
    <View style={styles.header}>
      <Image
        source={{ uri: postInfo.photo }}
        style={GlobalStyles.profilePhoto}
      />
      <Text>{postInfo.who}</Text>
      <Ionicons
        name="ellipsis-vertical"
        size={24}
        color="black"
        style={styles.endElement}
      />
    </View>
    <Image source={{ uri: postInfo.photo }} style={styles.postPhoto} />
    <View style={styles.desc}>
      <Text>{postInfo.comment}</Text>
      <View style={styles.likes}>
        <Text>{postInfo.likes}</Text>
        <Ionicons name="md-heart-outline" size={24} color="black" />
      </View>
    </View>
  </View>
);

export default PostComponent;
