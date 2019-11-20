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

import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
  ...config,
  Storage: {
    AWSS3: {
      bucket: config.aws_user_files_s3_bucket, //REQUIRED -  Amazon S3 bucket
      region: config.aws_user_files_s3_bucket_region //OPTIONAL -  Amazon service region
    }
  },
  Analytics: { disabled: true }
});

function App(props) {
  const { setCurrentUserUsername, state } = useContext(UserContext);

  const [isLoadingComplete, setLoadingComplete] = useState(false);
  useEffect(() => {
    _setUsername();
  }, []);
  const _setUsername = async () => {
    const { username } = await Auth.currentUserInfo();

    setCurrentUserUsername(username);
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      ...MaterialIcons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf')
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
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
