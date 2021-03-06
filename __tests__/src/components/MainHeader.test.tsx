import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

import {MainHeader} from '~/components/Header';

let navigation: any = {
  navigate: jest.fn(),
  state: {
    routeName: 'Main',
  },
};

describe('MainHeader: Functionality', () => {
  test('Press Home Icon', () => {
    navigation = {
      navigate: jest.fn(),
      state: {
        routeName: 'Settings',
      },
    };

    const {getByTestId} = render(
      <MainHeader navigation={navigation} primary="#009cff" />,
    );

    const spy = jest.spyOn(navigation, 'navigate');
    const homeIcon = getByTestId('home');
    fireEvent.press(homeIcon);
    expect(spy).toHaveBeenCalled();
  });

  test('Press settings icon', async () => {
    navigation = {
      navigate: jest.fn(),
      state: {
        routeName: 'Main',
      },
    };

    const {getByTestId} = render(
      <MainHeader navigation={navigation} primary="#009cff" />,
    );

    const spy = jest.spyOn(navigation, 'navigate');
    const settingsIcon = getByTestId('settings');
    fireEvent.press(settingsIcon);
    expect(spy).toHaveBeenCalledWith('Settings');
  });

  test('Press home icon: No navigation props', () => {
    try {
      const {getByTestId} = render(
        <MainHeader navigation={{} as any} primary="#009cff" />,
      );

      const homeIcon = getByTestId('home');
      fireEvent.press(homeIcon);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
