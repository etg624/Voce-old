import React, { useContext, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { StreamApp } from 'expo-activity-feed';
import stream from 'getstream';
import AppNavigator from './src/navigation/AppNavigator';
import { STREAM_API_KEY, STREAM_APP_ID, STREAM_API_SECRET } from './config';

import config from './aws-exports';
import { createUser } from './src/graphql/mutations';
import { listUsers } from './src/graphql/queries';

import { Context as UserContext } from './src/context/userContext/userContext';

import { Provider as RecordingProvider } from './src/context/recordingsContext/recordingsContext';
import { Provider as UserProvider } from './src/context/userContext/userContext';
import { Provider as AudioProvider } from './src/context/audioContext/audioContext';

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
    // <StreamApp
    //   apiKey={STREAM_API_KEY}
    //   appId={STREAM_APP_ID}
    //   userId={stream.connect(STREAM_API_KEY, null, STREAM_APP_ID)}
    // >
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <AppNavigator />
    </View>
    // </StreamApp>
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
      <AudioProvider>
        <RecordingProvider>
          <App />
        </RecordingProvider>
      </AudioProvider>
    </UserProvider>
  ),
  true
);
