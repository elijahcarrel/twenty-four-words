import React, {useState} from "react";
import { CommonButton } from "../common-components/common-button";
import { saveName } from "../state/user";
import { setPage } from "../state/page";
import { pageNames } from "../page-names";
import {connect, useDispatch} from "react-redux";
import { CommonPage } from "../common-components/common-page";
import { HeaderText } from "../common-components/header-text";
import { CommonInput } from "../common-components/common-input";

export const EnterNameContainer = () => {
  const [name, setName] = useState();

  const submitName = () => {
    const dispatch = useDispatch();
    const { name } = this.state;
    if (name) {
      dispatch(saveName(name));
      dispatch(setPage(pageNames.MAIN));
    }
  };

  return (
    <CommonPage>
      <HeaderText>Enter your name.</HeaderText>
      <CommonInput
        onChangeText={setName}
        onSubmitEditing={submitName}
        value={name}
      />
      <CommonButton
        title="Go"
        onPress={submitName}
        disabled={!name}
      />
    </CommonPage>
  );
};
