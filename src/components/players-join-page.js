import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { CommonButton } from 'components/common-button';
import { Players } from "components/players"
import { Input, Icon, Button } from 'react-native-elements';

import { createNewGame } from "state/game";
import { setPage } from "state/page";

class PlayersJoinPageComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.submitName = this.submitName.bind(this);
  };

  componentDidMount = () => {
    const { createNewGame, clientId, name } = this.props;
    createNewGame(clientId, name);
  };

  render = () => {
    const { gameCode, setPage } = this.props;
    if (!gameCode) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true}/>
        </View>
      );
    }
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.h2}>Your game ID</Text>
        <Text style={styles.h1}>{gameCode}</Text>
        <Text style={styles.h2}>Tell other players to join this game ID.</Text>
        <Players />
        <Text style={styles.h2}>Once everyone has joined, click start to begin.</Text>
        <CommonButton
          title="Start Game"
          onPress={() => setPage("add-words")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },

  h2: {
    marginTop: 5,
    fontSize: 14,
  },

  bodyContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
  },

  activityIndicatorContainer: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

});

const mapStateToProps = ({
  gameState: {
    gameCode,
  },
  userState: {
    clientId,
    name,
  }
}) => ({
  gameCode,
  clientId,
  name,
});
const mapDispatchToProps = {
  createNewGame,
  setPage,
};
export const PlayersJoinPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayersJoinPageComponent);
