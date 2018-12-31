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

import { createRoom, subscribeToRoom, subscribeToUsers } from "state/room";
import { startGame } from "state/game";
import { LoadingScreen } from "./loading-screen";

class RoomContainerComponent extends React.Component {
  
  componentDidMount = () => {
    const { roomId, subscribeToRoom } = this.props;
    this.unsubscribeFromRoom = subscribeToRoom(roomId);
    this.unsubscribeFromUsers = subscribeToUsers(roomId);
  };
  
  componentWillUnmount = () => {
    this.unsubscribeFromRoom && this.unsubscribeFromRoom();
    this.unsubscribeFromUsers  && this.unsubscribeFromUsers();
  };
  
  render = () => {
    const { roomCode, roomId, users } = this.props;
    if (!roomCode) {
      return (
        <LoadingScreen />
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
  startGame,
  subscribeToRoom,
};
export const RoomContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoomContainerComponent);
