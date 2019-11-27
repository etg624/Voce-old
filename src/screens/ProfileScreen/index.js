import React from "react";
import { View, Text } from "react-native";

import RecordingListScreen from "../RecordingListScreen/index";

const ProfileScreen = ({ navigation }) => {
  return (
    <>
      <View>
        <Text>Profile Info Will Go Here</Text>
      </View>

      <RecordingListScreen type="profile" userId={navigation.getParam("userId")} />
    </>
  );
};

export default ProfileScreen;
