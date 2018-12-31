import React from "react";
import { connect } from "react-redux";
import { Text } from 'react-native';
import { CommonPage } from "common-components/common-page";

class PlayContainerComponent extends React.Component {
  render = () => {
    const { gameId } = this.props;
    return (
      <CommonPage>
        <Text>Woohoo we're playing game {gameId}.</Text>
      </CommonPage>
    );
  }
}

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
