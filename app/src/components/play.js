import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from 'react-native';

class PlayContainerComponent extends React.Component {
  render = () => {
    const { gameId } = this.props;
    return (
      <View style={styles.bodyContainer}>
        <Text>Woohoo we're playing game {gameId}.</Text>
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

const mapStateToProps = ({
  gameState: {
    gameId,
  },
}) => ({
  gameId,
});

export const PlayContainer = connect(
  mapStateToProps,
  null,
)(PlayContainerComponent);
