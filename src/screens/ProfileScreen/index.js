import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import RecordingListScreen from '../RecordingListScreen/index';
const ProfileScreen = ({ navigation }) => {
  const userId = navigation.getParam('userId');
  return (
    <>
      <View>
        <Text>Profile Info Will Go Here</Text>
      </View>
      <RecordingListScreen type="profile" userId={userId} />
    </>
  );
};

export default ProfileScreen;
