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

import { createRoom, addRoomListener } from "state/room";
import { setTeam } from "state/user";
import { startGame } from "state/game";

class RoomContainerComponent extends React.Component {
  componentDidMount = () => {
    const { roomId, addRoomListener } = this.props;
    addRoomListener(roomId);
  };
  
  render = () => {
    const { roomCode, roomId, users } = this.props;
    if (!roomCode) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true}/>
        </View>
      );
    }
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.h2}>Your game code</Text>
        <Text style={styles.h1}>{roomCode}</Text>
        <Text style={styles.h2}>Tell other players to join this game code.</Text>
        <Players players={users}/>
        <Text style={styles.h2}>Once everyone has joined, click start to begin.</Text>
        <CommonButton
          title="Start Game"
          onPress={() => startGame(roomId)}
        />
      </View>
    );
  }
};

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
  roomState: {
    roomId,
    roomCode,
    users,
  },
}) => ({
  roomId,
  roomCode,
  users,
});
const mapDispatchToProps = {
  createRoom,
  setTeam,
  startGame,
  addRoomListener,
};
export const RoomContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoomContainerComponent);
