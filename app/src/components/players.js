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
    const { players, myTeam } = this.props;
    return (<View style={styles.playersContainer}>
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
    </View>);
  }
}

const mapStateToProps = ({
  playerState: {
    team,
  },
  roomState: {
    roomId,
  }
}) => ({
  myTeam: team,
  roomId,
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
