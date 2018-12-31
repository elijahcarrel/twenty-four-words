import React from "react";
import { StyleSheet, Text } from "react-native";

export const SubheaderText = props => {
  const { children } = props;
  return (
    <Text style={styles.subheaderText}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  subheaderText: {
    marginTop: 5,
    fontSize: 14,
  },
});
