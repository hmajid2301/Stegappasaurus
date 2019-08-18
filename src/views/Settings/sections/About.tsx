import * as MailComposer from "expo-mail-composer";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ListItem } from "react-native-elements";

import { ThemeColors } from "@types";
import MarkdownModal from "~/components/MarkdownModal";
import changelog from "~/data/changelog";
import styles from "./styles";

interface IProps {
  background: ThemeColors;
  color: ThemeColors;
}

const About = ({ background, color }: IProps) => (
  <View>
    <ListItem
      containerStyle={{
        backgroundColor: background
      }}
      titleStyle={styles.itemHeader}
      title={<Text style={styles.itemHeaderText}>About</Text>}
    />
    <ListItem
      containerStyle={{
        backgroundColor: background
      }}
      title={
        <MarkdownModal background={background} color={color} name="Changelog">
          {changelog}
        </MarkdownModal>
      }
      topDivider={true}
      bottomDivider={true}
    />

    <ListItem
      containerStyle={{
        backgroundColor: background
      }}
      title={
        <View>
          <TouchableOpacity onPress={() => sendEmail()}>
            <Text style={[styles.itemText, { color }]}>Email</Text>
            <Text style={[styles.itemText, styles.itemTextUnder]}>
              me@haseebmajid.dev
            </Text>
          </TouchableOpacity>
        </View>
      }
      bottomDivider={true}
    />
  </View>
);

const sendEmail = async () => {
  await MailComposer.composeAsync({
    recipients: ["me@haseebmajid.dev"],
    subject: "Stegappasaurus"
  });
};

export default About;
