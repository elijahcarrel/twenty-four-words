import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { setPage } from "state/page";
import { CommonButton } from 'components/common-button'

class MainContainerComponent extends React.Component {
  render = () => {
    const { setPage } = this.props;
    return (
      <View style={styles.bodyContainer}>
        <CommonButton
          title="Create Game"
          onPress={() => setPage("players-join")}
        />
        <CommonButton
          title="Join Game"
          onPress={() => setPage("join-game")}
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
};
export const MainContainer = connect(
  null,
  mapDispatchToProps,
)(MainContainerComponent);
