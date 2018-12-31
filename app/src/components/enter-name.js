import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { CommonButton } from 'components/common-button';
import { Input } from 'react-native-elements';
import { saveName } from "state/user";
import { setPage } from "state/page";
import { pages } from "page-map";

class EnterNameContainerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.submitName = this.submitName.bind(this);
  };

  submitName = () => {
    const { saveName, setPage } = this.props;
    const { name } = this.state;
    if (name) {
      saveName(name);
      console.log("About to call setPage with ", pages.MAIN);
      console.log("setPage is ", setPage);
      console.log("saveName is ", saveName);
      setPage(pages.MAIN);
    }
  };

  render = () => {
    const { name } = this.state;
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.h1}>Enter your name.</Text>
        <View style={styles.textInputContainer}>
          <Input
            textAlign="center"
            containerStyle={[styles.inputContainerStyle]}
            autoFocus
            onChangeText={(name) => this.setState({ name })}
            onSubmitEditing={this.submitName}
            value={name}
            blurOnSubmit={false}
          />
        </View>
        <CommonButton
          title="Go"
          onPress={this.submitName}
          disabled={!name}
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

  // textInput: {
  //   height: 35,
  //   width: 200,
  //   fontSize: 30,
  // },

  textInputContainer: {
    padding: 20,
  },
  inputContainerStyle: {
    width: 200,
  },
});

const mapDispatchToProps = {
  saveName,
  setPage,
};
export const EnterNameContainer = connect(
  null,
  mapDispatchToProps,
)(EnterNameContainerComponent);
