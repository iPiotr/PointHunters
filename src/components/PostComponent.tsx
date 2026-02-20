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
  points: number;
  meters: number;
};

const PostComponent: React.FC<{ postId: string; postInfo: Post }> = ({
  postId,
  postInfo,
}) => {
  let horiz = postInfo.points == 1 ? -35 : -40;
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
            <Text>{postInfo.who}</Text>
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Image
          style={{
            flex: 1,
            width: "100%",
            height: "65%",
            zIndex: -1,
          }}
          source={{ uri: postInfo.photo }}
        />
        <Text
          style={{
            position: "absolute",
            fontSize: 24,
            zIndex: 1,
            color: "#28282B",
            margin: 100,
          }}
        >
          {postInfo.points} {postInfo.points == 1 ? "point" : "points"}
        </Text>
        <View>
          <Text
            style={{
              position: "absolute",
              fontSize: 24,
              zIndex: 2,
              color: "#28282B",
              marginVertical: -90,
              marginHorizontal: horiz,
            }}
          >
            {postInfo.meters} m
          </Text>
        </View>
      </View>

      <View style={styles.desc}>
        <Text>{postInfo.comment}</Text>
      </View>
    </View>
  );
};

export default PostComponent;
