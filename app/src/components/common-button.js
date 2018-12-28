import React from 'react';
import { Button } from 'react-native-elements'
import { StyleSheet } from "react-native";

export const CommonButton = (props) => {
  const { buttonStyle } = props;
  return (<Button
    buttonStyle={[...(buttonStyle || []), styles.button]}
    {...props}
    />);
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'steelblue',
    borderRadius: 3,
    marginTop: 10,
  },
});
