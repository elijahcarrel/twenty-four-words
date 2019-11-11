import React, {useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { CommonButton } from "../common-components/common-button";
import { joinRoom } from "../state/room";
import { CommonPage } from "../common-components/common-page";
import { HeaderText } from "../common-components/header-text";
import { CommonInput } from "../common-components/common-input";
import { ErrorText } from "../common-components/error-text";

type Props = {
  joinRoom: Function,
  error?: string,
}

export const JoinRoomContainer = (props: Props) => {
  const [roomCode, setRoomCode] = useState("");
  const error = useSelector(state => state.roomState.error);
  const dispatch = useDispatch();

  const submitRoomCode = () => {
    if (roomCode) {
      dispatch(joinRoom(roomCode));
    }
  };

  return (
    <CommonPage>
      <HeaderText>Enter game code</HeaderText>
      {error && (<ErrorText>{error}</ErrorText>)}
      <CommonInput
        onChangeText={setRoomCode}
        onSubmitEditing={submitRoomCode}
        value={roomCode}
      />
      <CommonButton
        title="Go"
        onPress={this.submitRoomCode}
      />
    </CommonPage>
  );
};
