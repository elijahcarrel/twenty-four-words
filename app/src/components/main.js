import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { setPage } from "state/page";
import { createRoom } from "state/room";
import { CommonButton } from 'components/common-button'
import { pages } from "page-map";

class MainContainerComponent extends React.Component {
  render = () => {
    const { setPage, createRoom } = this.props;
    return (
      <View style={styles.bodyContainer}>
        <CommonButton
          title="Create Game"
          onPress={createRoom}
        />
        <CommonButton
          title="Join Game"
          onPress={() => setPage(pages.JOIN)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
  },
});

const mapDispatchToProps = {
  setPage,
  createRoom,
};
export const MainContainer = connect(
  null,
  mapDispatchToProps,
)(MainContainerComponent);
