import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { Context } from '../../context/userContext/userContext';

import RecordingListScreen from '../../components/RecordingsList/index';

const CurrentUserProfile = ({ navigation }) => {
  //prettier-ignore
  const {state: { currentUser }} = useContext(Context);

  return (
    <>
      <View>
        <Text>Profile Info Will Go Here</Text>
      </View>
      <RecordingListScreen screenToShow="profile" userId={currentUser.id} />
    </>
  );
};

export default CurrentUserProfile;
