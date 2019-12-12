import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import RecordingList from '../../components/recordingsList/index';
import { Context as UserContext } from '../../context/userContext/userContext';
import { Context as RecordingsContext } from '../../context/recordingsContext/recordingsContext';

const ProfileScreen = ({ navigation, profileType, isFocused }) => {
  const {
    state: { currentUser },
  } = useContext(UserContext);

  const {
    getUserRecordingsById,
    state: { loading },
  } = useContext(RecordingsContext);

  const navigatedUserId = navigation.getParam('userId');

  useEffect(() => {
    !isFocused
      ? null
      : profileType === 'currentUser'
      ? getUserRecordingsById(currentUser.id)
      : getUserRecordingsById(navigatedUserId);
  }, [isFocused]);

  return (
    <>
      <View>
        <Text>Profile Info Will Go Here</Text>
      </View>
      <RecordingList screenToShow="profile" isLoading={loading} />
    </>
  );
};

export default withNavigationFocus(ProfileScreen);
