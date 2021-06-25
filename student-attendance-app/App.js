import React from "react";
import { View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Home from "./screens/HomeScreen";
import AttendanceScreen from "./screens/AttendanceScreen";

export default class App extends React.Component {
  render() {
    return (
      <View>
        <AppContainer />
      </View>
    );
  }
}

var switchNavigator = createSwitchNavigator({
  HomeScreen: Home,
  AttendanceScreen: AttendanceScreen,
});

const AppContainer = createAppContainer(switchNavigator);
