import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/tabBarIcon';
import RecordingScreen from '../screens/RecordingScreen/index';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen/index';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const RecordStack = createStackNavigator(
  {
    Record: RecordingScreen,
  },
  config
);

RecordStack.navigationOptions = {
  tabBarLabel: 'Record',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? `ios-mic` : 'md-mic'} />
  ),
};

RecordStack.path = '';

/*------Feed------*/
const FeedStack = createStackNavigator(
  {
    Feed: FeedScreen,
    PressedUserProfile: { screen: props => <ProfileScreen {...props} profileType="pressedUser" /> },
  },
  config
);

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  ),
};

FeedStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: props => {
        // console.log(props);
        return <ProfileScreen {...props} profileType="currentUser" />;
      },
    },
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-list'} />
  ),
};

const tabNavigator = createBottomTabNavigator({
  FeedStack,
  ProfileStack,
  RecordStack,
});

tabNavigator.path = '';

export default tabNavigator;
