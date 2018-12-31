import React from "react";
import { connect } from "react-redux";
import { CommonButton } from 'common-components/common-button';
import { Players } from "components/players"

import { createRoom, subscribeToRoom, subscribeToUsers } from "state/room";
import { startGame } from "state/game";
import { LoadingPage } from "common-components/loading-page";
import { CommonPage } from "common-components/common-page";
import { HeaderText } from "common-components/header-text";
import { SubheaderText } from "common-components/subheader-text";

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
        <LoadingPage />
      );
    }
    return (
      <CommonPage>
        <SubheaderText>Your game code</SubheaderText>
        <HeaderText>{roomCode}</HeaderText>
        <SubheaderText>Tell other players to join this game code.</SubheaderText>
        <Players players={users}/>
        <SubheaderText>Once everyone has joined, click start to begin.</SubheaderText>
        <CommonButton
          title="Start Game"
          onPress={() => startGame(roomId)}
        />
      </CommonPage>
    );
  }
};

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
