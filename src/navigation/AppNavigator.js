import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider } from '../context/recordingContext/RecordingContext';
import MainTabNavigator from './MainTabNavigator';

const App = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator
  })
);

export default () => (
  <Provider>
    <App />
  </Provider>
);
