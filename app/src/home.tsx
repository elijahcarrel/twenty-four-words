import React from "react"
import { AppBar } from "./common-components/app-bar";
import { pageComponents } from "./page-components";
import {
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

export const Home = (props) => {
  const page = useSelector(state => state.pageState.page);
  console.log("In home and page = ", page);
  const PageComponent = pageComponents[page];
  return (
    <View style={styles.homeContainer}>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
      />
      <AppBar />
      {PageComponent && (<PageComponent />)}
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flexDirection: "column",
  },
});
