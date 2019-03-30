import React, { Component } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { PacmanIndicator } from "react-native-indicators";

import { ITheme, PrimaryColor } from "~/util/interfaces";
import styles from "./styles";

interface IProps {
  animating: boolean;
  onPress?: (...args: any) => void;
  photo: string;
  primaryColor: PrimaryColor;
  theme: ITheme;
}

export default class ImageProgress extends Component<IProps, {}> {
  public render() {
    const { theme } = this.props;

    return (
      <View
        style={[
          styles.encodeImageContainer,
          { backgroundColor: theme.background }
        ]}
      >
        {this.props.animating ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <PacmanIndicator color={this.props.primaryColor} size={300} />
          </View>
        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
            <ImageBackground
              imageStyle={[
                styles.circularImage,
                { borderColor: this.props.primaryColor }
              ]}
              source={{ uri: this.props.photo }}
              style={styles.encodingImage}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
