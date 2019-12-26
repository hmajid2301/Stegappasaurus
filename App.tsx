import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {StatusBar} from 'react-native';
import {Appearance} from 'react-native-appearance';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SplashScreen from 'react-native-splash-screen';

import IntroSlider from '~/components/IntroSlider';
import Loader from '~/components/Loader';
import {slides} from '~/data';
import {ThemeContext} from '~/providers/ThemeContext';
import Main from '~/views/Home';

interface IState {
  loading: boolean;
  introShown: boolean | null;
}

export default class App extends React.Component<{}, IState> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public state = {
    introShown: false,
    loading: true,
  };

  public render() {
    if (this.state.loading) {
      return (
        <StatusBar hidden={true}>
          <Loader loading={this.state.loading} />
        </StatusBar>
      );
    } else if (!this.state.introShown) {
      return <IntroSlider slides={slides} onDone={this.introShownToUser} />;
    }
    return <Main />;
  }

  public async componentDidMount() {
    SplashScreen.hide();
    const [storedIntroShown, storedTheme] = await Promise.all([
      AsyncStorage.getItem('@IntroShown'),
      AsyncStorage.getItem('@Theme'),
    ]);

    let introShown = false;
    if (storedIntroShown) {
      introShown = storedIntroShown === 'true' ? true : false;
    }

    let darkTheme = false;
    if (storedTheme) {
      darkTheme = storedTheme === 'true' ? true : false;
    }

    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
      darkTheme = true;
    }
    this.context.changeTheme(darkTheme);

    Appearance.addChangeListener(({colorScheme: osColorScheme}) => {
      const isDark = osColorScheme === 'dark' ? true : false;
      this.context.changeTheme(isDark);
    });

    // @ts-ignore
    changeNavigationBarColor(
      this.context.theme.isDark ? '#17212d' : '#ffffff',
      !this.context.theme.isDark,
      false,
    );
    this.setState({
      introShown,
      loading: false,
    });
  }

  public componentWillUnmount() {
    const subscription = Appearance.addChangeListener(_ => null);
    subscription.remove();
  }

  private introShownToUser = async () => {
    await AsyncStorage.setItem('@IntroShown', 'true');
    this.setState({introShown: true});
  };
}
