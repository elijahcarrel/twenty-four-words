import React from "react";
import { connect } from "react-redux";
import { Text } from 'react-native';
import { CommonPage } from "~/common-components/common-page";

type Props = {
  gameId: string,
}

class PlayContainerComponent extends React.Component<Props> {
  render() {
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
