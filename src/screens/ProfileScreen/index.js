import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';

import RecordingListScreen from '../../components/RecordingsList/index';
import { Context as UserContext } from '../../context/userContext/userContext';

const ProfileScreen = ({ navigation, profileType }) => {
  const {
    getUserDataById,
    resetPressedUserState,
    state: { currentUser, pressedUserData },
  } = useContext(UserContext);
  const navigatedUserId = navigation.getParam('userId');

  useEffect(() => {
    profileType === 'currentUser'
      ? getUserDataById(currentUser.id)
      : getUserDataById(navigatedUserId);
    return () => resetPressedUserState();
  }, [profileType]);

  return (
    <>
      <View>
        <Text>Profile Info Will Go Here</Text>
      </View>
      <RecordingListScreen
        screenToShow="profile"
        recordings={
          profileType === 'currentUser'
            ? currentUser.recordings
            : pressedUserData && pressedUserData.recordings.items
        }
      />
    </>
  );
};

export default ProfileScreen;
