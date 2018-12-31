import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const LoadingScreen = () => {
  return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator animating={true}/>
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
