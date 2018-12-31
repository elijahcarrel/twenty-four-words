import React from "react";
import { connect } from "react-redux";
import { CommonButton } from 'common-components/common-button';
import { joinRoom } from "state/room";
import { CommonPage } from "common-components/common-page";
import { HeaderText } from "common-components/header-text";
import { CommonInput } from "common-components/common-input";
import { ErrorText } from "../common-components/error-text";

class JoinRoomContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
    };
    this.submitRoomCode = this.submitRoomCode.bind(this);
  };

  submitRoomCode = () => {
    const { joinRoom } = this.props;
    const { roomCode } = this.state;
    if (roomCode) {
      joinRoom(roomCode)
    }
  };

  render = () => {
    const { roomCode, error } = this.props;
    return (
      <CommonPage>
        <HeaderText>Enter game code</HeaderText>
        {error && (<ErrorText>{error}</ErrorText>)}
        <CommonInput
          onChangeText={(roomCode) => this.setState({ roomCode })}
          onSubmitEditing={this.submitRoomCode}
          value={roomCode}
        />
        <CommonButton
          title="Go"
          onPress={this.submitRoomCode}
        />
      </CommonPage>
    );
  }
}

const mapStateToProps = ({
  roomState: {
    error,
  },
}) => ({
  error,
});

const mapDispatchToProps = {
  joinRoom,
};

export const JoinRoomContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JoinRoomContainerComponent);
