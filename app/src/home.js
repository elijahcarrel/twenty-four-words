'use strict';
import React from "react"

import { AppBar } from "components/app-bar"
import { pageMap, defaultPage } from "page-map"

import {
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';

import { connect } from 'react-redux';

class HomeComponent extends React.Component {
  render = () => {
    const { page } = this.props;
    const PageComponent = pageMap.get(page) || defaultPage;
    return (
      <View style={styles.homeContainer}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
        />
        <AppBar />
        <PageComponent />
      </View>
    );
  }
}

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
