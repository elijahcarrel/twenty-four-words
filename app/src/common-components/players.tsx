import React, {useMemo} from "react";

import { ListItem } from 'react-native-elements'
import { getPlayers } from "../state/players";
import { PlayerAvatar } from "./player-avatar";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  players: any,
}

export const Players = (props: Props) => {
  const { players } = props;
  const dispatch = useDispatch();
  const myTeam = useSelector(state => state.playerState.team);
  // const roomId = useSelector(state => state.roomState.roomId);
  const gameId = useSelector(state => state.gameState.gameId);
  useMemo(() => dispatch(getPlayers(gameId)), [dispatch]);

  return (
    <View style={styles.playersContainer}>
      {
        players.map(({ name, team = -1 }, index) => {
          let subtitle = "Opponent";
          // Must check if it equals -1 before checking if it equals myTeam since if both are -1 it should be blank.
          if (team === -1) {
            subtitle = "";
          } else if (team === myTeam) {
            subtitle = "Teammate";
          }

          return (
            <ListItem
              key={index}
              leftElement={
                <PlayerAvatar
                  name={name}
                  team={team}
                />}
              title={name}
              subtitle={subtitle}
              containerStyle={styles.playerListItemContainer}
              titleStyle={styles.playerTitle}
            />
          );
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  playersContainer: {
    // flex: 1,
  },
  playerListItemContainer: {
    // flex: 1,
  },
  playerTitle: {
    color: "black",
  }
});
