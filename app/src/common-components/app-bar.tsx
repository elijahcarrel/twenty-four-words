import React from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { PlayerAvatar } from "./player-avatar";

export const AppBar = (props) => {
  const { name, team } = useSelector(state => state.userState);
  const Avatar = name ? (
    <View style={styles.nameAndAvatar}>
      <PlayerAvatar
        name={name}
        team={team}
      />
    </View>
  ) : null;
  return (
    <View style={styles.appBarContainer}>
      <Text style={styles.appNameText}># 24words</Text>
      {Avatar}
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'skyblue',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 25,
    // height: 70,
  },
  appNameText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: '#ffffff',
  },
  nameAndAvatar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
  },
  // nameTextContainer: {
  //   flexDirection: "column",
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 20,
  // },
  // nameText: {
  //   fontSize: 15,
  //   fontWeight: "bold",
  //   color: '#ffffff',
  // }
});
