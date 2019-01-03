import { EnterNameContainer } from "~/components/enter-name"
import { MainContainer } from "~/components/main"
import { RoomContainer } from "~/components/room"
import { JoinRoomContainer } from "~/components/join-room"
import { PlayContainer } from "~/components/play";
import { AddWordsContainer } from "~/components/add-words";
import { pageNames } from "~/page-names";

export const pageComponents = {
  [pageNames.ENTER_NAME]: EnterNameContainer,
  [pageNames.MAIN]: MainContainer,
  [pageNames.JOIN]: JoinRoomContainer,
  [pageNames.ROOM]: RoomContainer,
  [pageNames.PLAY]: PlayContainer,
  [pageNames.ADD_WORDS]: AddWordsContainer,
};
