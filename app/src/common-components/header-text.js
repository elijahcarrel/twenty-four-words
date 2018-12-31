import React from "react";
import { StyleSheet, Text } from "react-native";

export const HeaderText = props => {
  const { children } = props;
  return (
    <Text style={styles.headerText}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
});
