import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { CommonButton } from 'components/common-button';

import { Input } from "react-native-elements";
import { joinGame } from "state/game";

class JoinGameContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameCode: "",
    };
    this.submitGameCode = this.submitGameCode.bind(this);
  };

  submitGameCode = () => {
    const { joinGame, clientId, name } = this.props;
    const { gameCode } = this.state;
    if (gameCode) {
      joinGame(gameCode, clientId, name)
      // TODO(ecarrel): put below line in joinGame.
    }
  };

  render = () => {
    const { gameCode, setPage } = this.props;
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.h1}>Enter game ID</Text>
        <View style={styles.textInputContainer}>
          <Input
            // style={styles.textInput}
            textAlign="center"
            containerStyle={[styles.inputContainerStyle]}
            autoFocus
            onChangeText={(gameCode) => this.setState({ gameCode })}
            onSubmitEditing={this.submitGameCode}
            value={gameCode}
            blurOnSubmit={false}
          />
        </View>
        <CommonButton
          title="Go"
          onPress={this.submitGameCode}
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

const mapStateToProps = ({
  userState: {
    clientId,
    name,
  }
}) => ({
  clientId,
  name,
});
const mapDispatchToProps = {
  joinGame,
};
export const JoinGameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JoinGameContainerComponent);
