import React from 'react';
import { View, Text } from 'react-native';

import RecordingListScreen from '../RecordingListScreen/index';

const ProfileScreen = () => {
  return (
    <>
      <View>
        <Text>Profile Info Will Go Here</Text>
      </View>

      <RecordingListScreen type="profile" />
    </>
  );
};

export default ProfileScreen;
