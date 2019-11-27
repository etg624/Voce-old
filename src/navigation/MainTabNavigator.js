import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import RecordingScreen from "../screens/RecordingScreen/index";
import RecordingsListScreen from "../screens/RecordingListScreen/index";
import ProfileScreen from "../screens/ProfileScreen/index";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const RecordStack = createStackNavigator(
  {
    Record: RecordingScreen
  },
  config
);

RecordStack.navigationOptions = {
  tabBarLabel: "Record",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? `ios-mic` : "md-mic"} />
  )
};

RecordStack.path = "";

/*------Recordings List------*/
const RecordingsListStack = createStackNavigator(
  {
    RecordingsList: RecordingsListScreen
  },
  config
);

RecordingsListStack.navigationOptions = {
  tabBarLabel: "Recordings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-list" : "md-list"} />
  )
};

RecordingsListStack.path = "";

const ProfileStack = createStackNavigator({ Profile: ProfileScreen }, config);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-list"}
    />
  )
};

const tabNavigator = createBottomTabNavigator({
  RecordingsListStack,
  ProfileStack,
  RecordStack
});

tabNavigator.path = "";

export default tabNavigator;
