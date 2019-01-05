import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { PlayerAvatar } from "~/common-components/player-avatar";

const AppBarComponent = (props) => {
  const { name, team } = props;
  return (
    <View style={styles.appBarContainer}>
      <Text style={styles.appNameText}># 24words</Text>
      {name &&
        (
          <View style={styles.nameAndAvatar}>
            <PlayerAvatar
              name={name}
              team={team}
            />
          </View>
        )}
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

const mapStateToProps = ({
  userState: {
    name,
    team,
  },
}) => ({
  name,
  team,
});
export const AppBar = connect(
  mapStateToProps,
  null,
)(AppBarComponent);
