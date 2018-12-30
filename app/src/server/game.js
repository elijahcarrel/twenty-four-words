import { putJson } from "./utils/fetching";

export const startGame = (roomId) => {
  return putJson(`/rooms/${roomId}/start`);
};