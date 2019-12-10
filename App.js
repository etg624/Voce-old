import { AppLoading } from 'expo';

import * as Font from 'expo-font';
import React, { useState, useContext, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AppNavigator from './src/navigation/AppNavigator';
import config from './aws-exports';

import { Context as UserContext } from './src/context/userContext/userContext';
import { Provider as RecordingProvider } from './src/context/recordingContext/recordingContext';
import { Provider as UserProvider } from './src/context/userContext/userContext';
import { createUser } from './src/graphql/mutations';
import { listUsers, getUser } from './src/graphql/queries';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';

Amplify.configure({
  ...config,
  Storage: {
    AWSS3: {
      bucket: config.aws_user_files_s3_bucket, //REQUIRED -  Amazon S3 bucket
      region: config.aws_user_files_s3_bucket_region, //OPTIONAL -  Amazon service region
    },
  },
  Analytics: { disabled: true },
});

function App(props) {
  const {
    setCurrentUserData,
    state: { currentUser },
  } = useContext(UserContext);

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    _findOrCreateUser();
  }, []);
  const _createUser = async _username => {
    return await API.graphql(graphqlOperation(createUser, { input: { username: _username } }));
  };

  const _findOrCreateUser = async () => {
    const { username } = await Auth.currentUserInfo();
    const filterByUsername = { filter: { username: { eq: username } } };

    const {
      data: {
        listUsers: { items },
      },
    } = await API.graphql(graphqlOperation(listUsers, filterByUsername));

    if (!items.length) {
      _createUser(username).then(res => setCurrentUserData(res.data.createUser));
    } else {
      setCurrentUserData(items[0]);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default withAuthenticator(
  () => (
    <UserProvider>
      <RecordingProvider>
        <App />
      </RecordingProvider>
    </UserProvider>
  ),
  true
);
