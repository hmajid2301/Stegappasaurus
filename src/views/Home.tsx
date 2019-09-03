import * as React from "react";
import { View } from "react-native";
import {
  createMaterialTopTabNavigator,
  NavigationScreenProp
} from "react-navigation";

import { ITheme } from "@types";
import AppHeader from "~/components/AppHeader";
import { colors, fonts } from "~/modules";
import Decoding from "~/views/Home/Decoding";
import Encoding from "~/views/Home/Encoding";

import styles from "./Home/styles";

const commonTabOptions = (color: string) => ({
  activeTintColor: colors.pureWhite,
  inactiveTintColor: "#DDD",
  indicatorStyle: {
    backgroundColor: colors.pureWhite
  },
  labelStyle: {
    fontFamily: fonts.body,
    fontSize: 12
  },
  pressColor: colors.pureWhite,
  style: {
    backgroundColor: color
  }
});

const TabNavigator = createMaterialTopTabNavigator(
  {
    Decoding: {
      navigationOptions: {
        tabBarLabel: "Decoding",
        tabBarOptions: commonTabOptions(colors.secondary)
      },
      screen: Decoding
    },
    Encoding: {
      navigationOptions: {
        tabBarLabel: "Encoding",
        tabBarOptions: commonTabOptions(colors.primary)
      },
      screen: Encoding
    }
  },
  {
    initialRouteName: "Encoding",
    order: ["Encoding", "Decoding"],
    tabBarPosition: "bottom"
  }
);

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

export default class Home extends React.Component<IProps, {}> {
  public static router = TabNavigator.router;

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <AppHeader navigation={this.props.navigation} theme={theme} />
        <TabNavigator
          navigation={this.props.navigation}
          screenProps={{ theme }}
        />
      </View>
    );
  }
}
