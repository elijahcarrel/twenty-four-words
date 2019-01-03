import React from "react";
import { connect } from "react-redux";
import { setPage } from "state/page";
import { createRoom } from "state/room";
import { CommonButton } from 'common-components/common-button'
import { pageNames } from "page-names";
import { CommonPage } from "common-components/common-page";

const MainContainerComponent = (props) => {
  const { setPage, createRoom } = props;
  return (
    <CommonPage>
      <CommonButton
        title="Create Game"
        onPress={createRoom}
      />
      <CommonButton
        title="Join Game"
        onPress={() => setPage(pageNames.JOIN)}
      />
    </CommonPage>
  );
};

const mapDispatchToProps = {
  setPage,
  createRoom,
};
export const MainContainer = connect(
  null,
  mapDispatchToProps,
)(MainContainerComponent);
