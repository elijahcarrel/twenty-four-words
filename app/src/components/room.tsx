import React, {useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import { CommonButton } from "../common-components/common-button";
import { Players } from "../common-components/players"
import { createRoom, subscribeToRoom, subscribeToUsers } from "../state/room";
import { startGame } from "../state/game";
import { LoadingPage } from "../common-components/loading-page";
import { CommonPage } from "../common-components/common-page";
import { HeaderText } from "../common-components/header-text";
import { SubheaderText } from "../common-components/subheader-text";

export const RoomContainer = () => {
  const {roomCode, roomId, users} = useSelector(state => state.roomState);
  const dispatch = useDispatch();
  const [unsubscribeFromRoom, setUnsubscribeFromRoom] = useState(null);
  const [unsubscribeFromUsers, setUnsubscribeFromUsers] = useState(null);
  useEffect(() => {
    setUnsubscribeFromRoom(dispatch(subscribeToRoom(roomId)));
    setUnsubscribeFromUsers(dispatch(subscribeToUsers(roomId)));
    return () => {
      unsubscribeFromRoom && unsubscribeFromRoom();
      unsubscribeFromUsers && unsubscribeFromUsers();
    }
  }, [dispatch]);

  if (!roomCode) {
    return (
      <LoadingPage/>
    );
  }
  return (
    <CommonPage>
      <SubheaderText>Your game code</SubheaderText>
      <HeaderText>{roomCode}</HeaderText>
      <SubheaderText>Tell other players to join this game code.</SubheaderText>
      <Players players={users}/>
      <SubheaderText>Once everyone has joined, click start to
        begin.</SubheaderText>
      <CommonButton
        title="Start Game"
        onPress={() => startGame(roomId)}
      />
    </CommonPage>
  );
};
