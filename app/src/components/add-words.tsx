import React, { useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import { addWord } from "../state/game";
import { LoadingPage } from "../common-components/loading-page";
import { CommonPage } from "../common-components/common-page";
import { HeaderText } from "../common-components/header-text";
import { SubheaderText } from "../common-components/subheader-text";
import { CommonButton } from "../common-components/common-button";

type Props = {
  loading: any,
}

export const AddWordsContainer = (props: Props) => {
  const [inputWord, setInputWord] = useState("");
  const dispatch = useDispatch();

  const addWordFromInput = () => {
    dispatch(addWord(inputWord.trim()));
    setInputWord("");
  };

  // handleTextChange(inputWord) {
  //   this.setState({inputWord: inputWord});
  // }

  // componentDidMount() {
  //   this.props.getData(); // Call our action
  // }

  const { loading } = props;
  const words = useSelector(state => state.gameState.words);
  if (loading) {
    console.log("Loading");
    return (
      <LoadingPage />
    );
  } else {
    console.log("Not loading");
    // @ts-ignore
    return (
      <CommonPage>
        <HeaderText>Add words to the pot.</HeaderText>
        <View style={styles.wordInputContainer}>
          // @ts-ignore TODO(ecarrel) fix this
          <TextInput
            style={styles.wordInput}
            // @ts-ignore TODO(ecarrel) fix this
            textAlign="center"
            autoFocus
            onChangeText={setInputWord}
            onSubmitEditing={addWordFromInput}
            value={inputWord}
            blurOnSubmit={false}
          />
        </View>
        <SubheaderText>Words can be anything: people, places, things, inside jokes, etc.</SubheaderText>
        <CommonButton
          title="Add Word"
          onPress={addWordFromInput}
          disabled={!inputWord}
        />
        <FlatList
          ref='listRef'
          data={words}
          // @ts-ignore TODO(ecarrel) fix this
          renderItem={({ item: { word, createdBy } }) => (
            // @ts-ignore TODO(ecarrel) fix this
            <View style={styles.row} textAlign={'center'}>
              <Text style={styles.wordInRow}>
                {word} (added by {createdBy})
              </Text>
            </View>
          )}
          keyExtractor={ (_, index) => index.toString() }
        />
      </CommonPage>
    );
  }
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
