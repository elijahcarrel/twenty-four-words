import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";

export const CommonInput = props => {
  return (
    <View style={styles.textInputContainer}>
      <Input
        textAlign="center"
        containerStyle={[styles.inputContainerStyle]}
        autoFocus
        blurOnSubmit={false}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    padding: 20,
  },
  inputContainerStyle: {
    width: 200,
  },
});
