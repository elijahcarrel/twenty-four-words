import React from "react";
import {useDispatch} from "react-redux";
import { setPage } from "../state/page";
import { createRoom } from "../state/room";
import { CommonButton } from "../common-components/common-button"
import { pageNames } from "../page-names";
import { CommonPage } from "../common-components/common-page";

export const MainContainer = (props) => {
  const dispatch = useDispatch();
  return (
    <CommonPage>
      <CommonButton
        title="Create Game"
        onPress={dispatch(createRoom)}
      />
      <CommonButton
        title="Join Game"
        onPress={() => dispatch(setPage(pageNames.JOIN))}
      />
    </CommonPage>
  );
};
