import React from "react";
import { connect } from "react-redux";
import { CommonButton } from "~/common-components/common-button";
import { Players } from "~/components/players"

import { createRoom, subscribeToRoom, subscribeToUsers } from "~/state/room";
import { startGame } from "~/state/game";
import { LoadingPage } from "~/common-components/loading-page";
import { CommonPage } from "~/common-components/common-page";
import { HeaderText } from "~/common-components/header-text";
import { SubheaderText } from "~/common-components/subheader-text";

type Props = {
  roomCode: string,
  roomId: string,
  users: any,
  subscribeToRoom: Function,
}

type State = {
  unsubscribeFromRoom: Function,
  unsubscribeFromUsers: Function,
}

class RoomContainerComponent extends React.Component<Props, State> {
  state = {
    unsubscribeFromRoom: null,
    unsubscribeFromUsers: null,
  };

  componentDidMount() {
    const { roomId, subscribeToRoom } = this.props;
    this.state.unsubscribeFromRoom = subscribeToRoom(roomId);
    this.state.unsubscribeFromUsers = subscribeToUsers(roomId);
  }
  
  componentWillUnmount() {
    this.state.unsubscribeFromRoom && this.state.unsubscribeFromRoom();
    this.state.unsubscribeFromUsers  && this.state.unsubscribeFromUsers();
  }
  
  render() {
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
