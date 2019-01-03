'use strict';
import React from "react"

import { AppBar } from "components/app-bar";
import { pageComponents } from "page-components";

import {
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';

import { connect } from 'react-redux';

const HomeComponent = (props) => {
  const { page } = props;
  const PageComponent = pageComponents[page];
  return (
    <View style={styles.homeContainer}>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
      />
      <AppBar />
      {PageComponent && (<PageComponent fakeProp="hey" />)}
    </View>
  );
};

const mapStateToProps = ({
  pageState: {
    page,
  },
}) => ({
  page,
});

export const Home = connect(
  mapStateToProps,
  null,
)(HomeComponent);

const styles = StyleSheet.create({
  homeContainer: {
    flexDirection: "column",
  },
});
