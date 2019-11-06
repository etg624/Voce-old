import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
import RecordingScreen from '../screens/RecordingScreen/index';
import RecordingsListScreen from '../screens/RecordingListScreen/index';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

const RecordStack = createStackNavigator(
  {
    Record: RecordingScreen
  },
  config
);

RecordStack.navigationOptions = {
  tabBarLabel: 'Record',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-mic` : 'md-mic'}
    />
  )
};

RecordStack.path = '';

/*------Recordings List------*/
const RecordingsListStack = createStackNavigator(
  {
    RecordingsList: RecordingsListScreen
  },
  config
);

RecordingsListStack.navigationOptions = {
  tabBarLabel: 'Recordings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  )
};

RecordingsListStack.path = '';

/*------Settings Screen------*/

// const SettingsStack = createStackNavigator(
//   {
//     Settings: SettingsScreen
//   },
//   config
// );

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   )
// };

// SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  RecordStack,
  RecordingsListStack
});

tabNavigator.path = '';

export default tabNavigator;
