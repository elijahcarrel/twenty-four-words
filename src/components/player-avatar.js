import { Avatar } from "react-native-elements";
import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

const getInitials = (name) => {
  if (!name) {
    return "";
  }
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

const PlayerAvatarComponent = (props) => {
  const { name, team, myTeam } = props;

  return (<Avatar
    size="small"
    rounded
    activeOpacity={0.7}
    title={getInitials(name)}
    iconStyle={team === myTeam ? styles.myTeam : styles.otherTeam}
  />);
};

const mapStateToProps = ({
  userState: {
    team,
  }
}) => ({
  myTeam: team,
});

export const PlayerAvatar = connect(
  mapStateToProps,
  null
)(PlayerAvatarComponent);

const styles = StyleSheet.create({
  otherTeam: {
    backgroundColor: "red",
  },
  myTeam: {
    backgroundColor: "green",
  },
});