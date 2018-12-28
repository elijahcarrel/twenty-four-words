import React from "react";

import { ListItem } from 'react-native-elements'
import { getPlayers } from "state/players";
import { PlayerAvatar } from "components/player-avatar";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

class PlayersComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { getPlayers, gameId } = this.props;
    getPlayers(gameId);
  };

  render = () => {
    const { players, team } = this.props;
    return (<View style={styles.playersContainer}>
      {
        players.map((player, index) => (
          <ListItem
            key={index}
            leftElement={
              <PlayerAvatar
                name={player.name}
                team={player.team}
              />}
            title={player.name}
            subtitle={player.team === team ? "Teammate" : "Opponent"}
            containerStyle={styles.playerListItemContainer}
            titleStyle={styles.playerTitle}
          />
        ))
      }
    </View>);
  }
}

const mapStateToProps = ({
  playersState: {
    players,
  },
  userState: {
    team,
  },
  gameState: {
    gameId,
  }
}) => ({
  players,
  team,
  gameId,
});
const mapDispatchToProps = {
  getPlayers
};
export const Players = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayersComponent);

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
