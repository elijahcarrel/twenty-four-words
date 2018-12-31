import React from "react";
import { EnterNameContainer } from "components/enter-name.js"
import { MainContainer } from "components/main.js"
import { RoomContainer } from "components/room.js"
import { JoinRoomContainer } from "components/join-room.js"
import { PlayContainer } from "components/play.js";

export const pages = {
  ENTER_NAME: "ENTER_NAME",
  MAIN: "MAIN",
  JOIN: "JOIN",
  ROOM: "ROOM",
  PLAY: "PLAY",
};

export const pageMap = {
  [pages.ENTER_NAME]: EnterNameContainer,
  [pages.MAIN]: MainContainer,
  [pages.JOIN]: JoinRoomContainer,
  [pages.ROOM]: RoomContainer,
  [pages.PLAY]: PlayContainer,
};
