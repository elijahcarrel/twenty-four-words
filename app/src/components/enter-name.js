"use strict";
import React from "react";
import { CommonButton } from 'common-components/common-button';
import { saveName } from "state/user";
import { setPage } from "state/page";
import { pageNames } from "app/src/page-names";
import { connect } from "react-redux";
import { CommonPage } from "common-components/common-page";
import { HeaderText } from "common-components/header-text";
import { CommonInput } from "../common-components/common-input";

class EnterNameContainerComponent extends React.Component {
  state = {
    name: "",
  };

  submitName = () => {
    const { saveName, setPage } = this.props;
    const { name } = this.state;
    if (name) {
      saveName(name);
      setPage(pageNames.MAIN);
    }
  };

  render = () => {
    const { name } = this.state;
    return (
      <CommonPage>
        <HeaderText>Enter your name.</HeaderText>
        <CommonInput
          onChangeText={(name) => this.setState({ name })}
          onSubmitEditing={this.submitName}
          value={name}
        />
        <CommonButton
          title="Go"
          onPress={this.submitName}
          disabled={!name}
        />
      </CommonPage>
    );
  };
}
const mapDispatchToProps = {
  saveName,
  setPage,
};

export const EnterNameContainer = connect(
  null,
  mapDispatchToProps,
)(EnterNameContainerComponent);
