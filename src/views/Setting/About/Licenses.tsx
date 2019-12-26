import React from 'react';
import {FlatList, Linking, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';

import license from '~/data/licenses.json';

interface ILicense {
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
  name: string;
}

export default class Licenses extends React.Component<{}, {}> {
  public render() {
    return (
      <FlatList
        data={this.cleanData()}
        keyExtractor={this.setKey}
        renderItem={this.renderItem}
      />
    );
  }

  private cleanData = () => {
    const data = Object.entries(license).map(item => {
      const [name, value] = item;
      return {name, ...value};
    });

    return data;
  };

  private setKey = (item: ILicense, _: number) => {
    return item.repository;
  };

  private renderItem = (item: any) => (
    <TouchableOpacity onPress={this.openLink.bind(this, item.repository)}>
      <ListItem
        title={item.name}
        subtitle={item.licenses}
        topDivider={true}
        bottomDivider={true}
        testID="license"
      />
    </TouchableOpacity>
  );

  private openLink = async (url: string) => {
    await Linking.openURL(url);
  };
}