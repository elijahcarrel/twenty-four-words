import React from "react";
import { StyleSheet, View } from "react-native";

export const CommonPage = props => {
  const { children } = props;
  return (
    <View style={styles.bodyContainer}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
  },
});
