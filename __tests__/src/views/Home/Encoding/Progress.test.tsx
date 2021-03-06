import {render, wait, fireEvent} from '@testing-library/react-native';
import React from 'react';
import Share from 'react-native-share';

import Steganography from '~/actions/Steganography';
import Snackbar from '~/actions/Snackbar';
import Progress from '~/views/Home/Encoding/Progress';

jest.mock('~/actions/Steganography');

const navigation: any = {
  addListener: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn().mockReturnValue({
    uri: 'file:///storage/emulated/0/Stegappasaurus/1575927505003.png',
  }),
  state: {
    routeName: 'Progress',
  },
};

describe('Encoding Progress: Functionality', () => {
  test('Success', async () => {
    Steganography.prototype.encode = jest
      .fn()
      .mockResolvedValue(
        'file:///storage/emulated/0/Stegappasaurus/1575927505003.png',
      );

    const spy = jest.spyOn(Snackbar, 'show');

    render(<Progress navigation={navigation} />);

    await wait(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  test('Share Image', async () => {
    Steganography.prototype.encode = jest
      .fn()
      .mockResolvedValue(
        'file:///storage/emulated/0/Stegappasaurus/1575927505003.png',
      );

    Share.open = jest.fn();
    const spy = jest.spyOn(Share, 'open');

    const {getByTestId} = render(<Progress navigation={navigation} />);
    const touchable = getByTestId('action');
    fireEvent.press(touchable);

    await wait(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  test('Failed', async () => {
    Steganography.prototype.encode = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const spy = jest.spyOn(navigation, 'navigate');

    render(<Progress navigation={navigation} />);

    await wait(() => {
      expect(spy).toHaveBeenCalledWith('Main');
    });
  });
});
