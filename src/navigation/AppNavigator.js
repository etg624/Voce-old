import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider as RecordingProvider } from '../context/recordingContext/recordingContext';
import { Provider as UserProvider } from '../context/userContext/userContext';
import MainTabNavigator from './MainTabNavigator';

const App = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator
  })
);

export default () => (
  <UserProvider>
    <RecordingProvider>
      <App />
    </RecordingProvider>
  </UserProvider>
);
