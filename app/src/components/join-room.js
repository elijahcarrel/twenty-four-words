import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { CommonButton } from 'components/common-button';

import { Input } from "react-native-elements";
import { joinRoom } from "state/room";

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
    const { roomCode } = this.props;
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.h1}>Enter game code</Text>
        <View style={styles.textInputContainer}>
          <Input
            // style={styles.textInput}
            textAlign="center"
            containerStyle={[styles.inputContainerStyle]}
            autoFocus
            onChangeText={(roomCode) => this.setState({ roomCode })}
            onSubmitEditing={this.submitRoomCode}
            value={roomCode}
            blurOnSubmit={false}
          />
        </View>
        <CommonButton
          title="Go"
          onPress={this.submitRoomCode}
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

  textInputContainer: {
    padding: 20,
  },
  inputContainerStyle: {
    width: 200,
  },

});

const mapDispatchToProps = {
  joinRoom,
};
export const JoinRoomContainer = connect(
  null,
  mapDispatchToProps,
)(JoinRoomContainerComponent);
