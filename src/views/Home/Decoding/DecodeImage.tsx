import React, { Component } from "react";
import { View } from "react-native";
import Canvas, { Image as CanvasImage } from "react-native-canvas";
import { NavigationScreenProp } from "react-navigation";

import ImageMessage from "~/components/ImageMessage";
import ImageProgressCircle from "~/components/ImageProgressCircle";
import { withDispatchAlgorithm } from "~/redux/hoc";
import Steganography from "~/services/steganography";
import { AlgorithmNames, ITheme, PrimaryColor } from "~/util/interfaces";
import { colors } from "~/util/styles";

interface IProps {
  algorithm: AlgorithmNames;
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  isDecoded: boolean;
  message: string;
  photo: string;
}

class DecodeImage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      isDecoded: false,
      message: "",
      photo: uri
    };
  }

  public render() {
    const { theme } = this.props.screenProps;

    if (this.state.isDecoded) {
      return (
        <ImageMessage message={this.state.message} photo={this.state.photo} />
      );
    }

    return (
      <View>
        <ImageProgressCircle
          action={this.decoded}
          photo={this.state.photo}
          primaryColor={colors.secondary as PrimaryColor}
          theme={theme}
        />
        <Canvas ref={this.decodeData} />
      </View>
    );
  }

  private decoded = () => {
    this.setState({ isDecoded: true });
  };

  private decodeData = async (canvas: Canvas) => {
    const image = new CanvasImage(canvas);
    image.addEventListener("load", () => {
      context.drawImage(image, 0, 0);
    });
    image.src = this.state.photo;
    const context = canvas.getContext("2d");
    const imageData = await context.getImageData(
      0,
      0,
      image.width,
      image.height
    );
    const steganography = new Steganography(this.props.algorithm, imageData);
    const decodedMessage = steganography.decode();
    this.setState({ message: decodedMessage });
  };
}

export default withDispatchAlgorithm(DecodeImage);
