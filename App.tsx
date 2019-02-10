import { AppLoading, Font } from "expo";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import MainApp from "~/MainApp";
import { persistor, store } from "~/redux/store";

const RobotoThin = require("~/assets/fonts/Roboto-Thin.ttf");
const RobotoLight = require("~/assets/fonts/Roboto-Light.ttf");
const Roboto = require("native-base/Fonts/Roboto.ttf");
const RobotoMedium = require("native-base/Fonts/Roboto_medium.ttf");

interface IState {
  loading: boolean;
}

export default class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { loading: true };
  }

  public componentWillMount = async () => {
    await Font.loadAsync({
      Roboto,
      RobotoLight,
      RobotoThin,
      Roboto_medium: RobotoMedium
    });

    this.setState({ loading: false });
  };

  public render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainApp />
        </PersistGate>
      </Provider>
    );
  }
}
