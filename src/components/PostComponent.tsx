import React from "react";
import { View, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "@components";
import useAuth from "../FirebaseAuth/useAuth";

import styles from "../screens/community/community.styles";

type Post = {
  who: string;
  comment: string;
  photo: string;
};

const PostComponent: React.FC<{ postId: string; postInfo: Post }> = ({
  postId,
  postInfo,
}) => {
  const { user } = useAuth();
  return (
    <View key={postId} style={styles.postBlock}>
      <View style={styles.header}>
        {user && user.photoURL ? (
          <>
            <Image
              source={{ uri: user.photoURL }}
              style={GlobalStyles.profilePhoto}
            />
            <Text>{user.displayName}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
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
      </View>
    </View>
  );
};

export default PostComponent;
