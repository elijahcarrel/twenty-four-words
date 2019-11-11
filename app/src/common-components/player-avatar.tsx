import { Avatar } from "react-native-elements";
import React from "react";
import { StyleSheet } from "react-native";
import { useSelector} from "react-redux";

type Props = {
  name: string;
  team: number;
};

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

export const PlayerAvatar = (props: Props) => {
  const { name, team } = props;
  const myTeam = useSelector(state => state.playerState.team);
  let iconStyle = styles.otherTeam;
  // Must check if it equals -1 before checking if it equals myTeam because if both are -1 then it should be grey.
  if (team === -1) {
    iconStyle = styles.noTeam;
  } else if (team === myTeam) {
    iconStyle = styles.myTeam;
  }
  return (
    <Avatar
      size="small"
      rounded
      activeOpacity={0.7}
      title={getInitials(name)}
      iconStyle={iconStyle}
    />
  );
};

const styles = StyleSheet.create({
  otherTeam: {
    backgroundColor: "red",
  },
  myTeam: {
    backgroundColor: "green",
  },
  noTeam: {
    backgroundColor: "grey",
  }
});