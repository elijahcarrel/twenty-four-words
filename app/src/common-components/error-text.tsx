import React from "react";
import { StyleSheet, Text } from "react-native";

export const ErrorText = props => {
  const { children } = props;
  return (
    <Text style={styles.errorText}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 10,
  },
});
