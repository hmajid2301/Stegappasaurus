import { createDrawerNavigator } from 'react-navigation';

import Encoding from './screens/Encoding';
import Settings from './screens/Settings';
import AboutUs from './screens/AboutUs';
import CustomDrawerNavigator from './components/CustomDrawerNavigator';
import styles from './components/Common/styles';


const MyApp = createDrawerNavigator({
  Encoding: {
    screen: Encoding,
  },
  Settings: {
    screen: Settings,
  },
  AboutUs: {
    screen: AboutUs,
  },
}, {
  initialRoute: 'Encoding',
  contentComponent: CustomDrawerNavigator,
  contentOptions: {
    activeTintColor: styles.pureWhite,
    activeBackgroundColor: styles.royalBlue,
  },
});

export default MyApp;
