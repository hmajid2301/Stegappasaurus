import {NavigationRoute, NavigationScreenProp} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Settings from '~/views/Settings';
import Main from './Decoding/Main';
import Message from './Decoding/Message';
import Progress from './Decoding/Progress';

const DecodeNavigator = createStackNavigator({
  DecodingMain: {
    navigationOptions: {
      header: null,
    },
    screen: Main,
  },

  DecodingMessage: {
    navigationOptions: {
      header: null,
    },
    screen: Message,
  },

  DecodingProgress: {
    navigationOptions: {
      header: null,
    },
    screen: Progress,
  },

  Settings: {
    navigationOptions: {
      header: null,
    },
    screen: Settings,
  },
});

DecodeNavigator.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationScreenProp<NavigationRoute>;
}) => ({
  swipeEnabled: navigation.state.index === 0,
  tabBarVisible: navigation.state.index === 0,
});

export default DecodeNavigator;
