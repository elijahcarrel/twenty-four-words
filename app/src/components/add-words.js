'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { addWord } from "state/game";
import { LoadingPage } from "common-components/loading-page";
import { CommonPage } from "common-components/common-page";
import { HeaderText } from "common-components/header-text";
import { SubheaderText } from "common-components/subheader-text";
import { CommonButton } from "common-components/common-button";

class AddWordsContainerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputWord: "",
    };

    this.addWordFromInput = this.addWordFromInput.bind(this);
  }

  addWordFromInput = () => {
    const { addWord } = this.props;
    addWord(this.state.inputWord.trim());
    this.setState({ inputWord: "" });
  };

  // handleTextChange(inputWord) {
  //   this.setState({inputWord: inputWord});
  // }

  // componentDidMount() {
  //   this.props.getData(); // Call our action
  // }

  render = () => {
    const { loading, words } = this.props;
    if (loading) {
      console.log("Loading");
      return (
        <LoadingPage />
      );
    } else {
      console.log("Not loading");
      return (
        <CommonPage>
          <HeaderText>Add words to the pot.</HeaderText>
          <View style={styles.wordInputContainer}>
            <TextInput
              style={styles.wordInput}
              textAlign="center"
              autoFocus
              onChangeText={(inputWord) => this.setState({ inputWord })}
              onSubmitEditing={this.addWordFromInput}
              value={this.state.inputWord}
              blurOnSubmit={false}
            />
          </View>
          <SubheaderText>Words can be anything: people, places, things, inside jokes, etc.</SubheaderText>
          <CommonButton
            title="Add Word"
            onPress={this.addWordFromInput}
            disabled={!this.state.inputWord}
          />
          <FlatList
            ref='listRef'
            data={words}
            renderItem={({ item: { word, createdBy }, index }) => (
              <View style={styles.row} textAlign={'center'}>
                <Text style={styles.wordInRow}>
                  {word} (added by {createdBy})
                </Text>
              </View>
            )}
            keyExtractor={ (item, index) => index.toString() }
          />
        </CommonPage>
      );
    }
  };
};

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },

  wordInRow: {
    fontSize: 16,
  },

  wordInput: {
    height: 35,
    width: 200,
    fontSize: 30,
  },

  wordInputContainer: {
    padding: 20,
  }
});

const mapStateToProps = ({
  gameState: {
    words,
  }
}) => ({
  words,
});

const mapDispatchToProps = {
  addWord,
};

// Connect everything
export const AddWordsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddWordsContainerComponent);
