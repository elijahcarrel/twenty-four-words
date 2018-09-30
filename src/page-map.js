import React from "react";
import { EnterNameContainer } from "components/enter-name.js"
import { MainContainer } from "components/main.js"
import { PlayersJoinPage } from "components/players-join-page.js"
// import { JoinGameContainer } from "components/join-game.js"

export const pageMap = new Map()
  .set("enter-name", EnterNameContainer)
  .set("main", MainContainer)
  .set("players-join", PlayersJoinPage);
  // .set("join-game", JoinGameContainer);

export const defaultPage = pageMap.get("enter-name");
