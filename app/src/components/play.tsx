import React from "react";
import { useSelector} from "react-redux";
import { Text } from 'react-native';
import { CommonPage } from "../common-components/common-page";

export const PlayContainer = () => {
  const gameId = useSelector(state => state.gameState.gameId);
  return (
    <CommonPage>
      <Text>Woohoo we're playing game {gameId}.</Text>
    </CommonPage>
  );
};
