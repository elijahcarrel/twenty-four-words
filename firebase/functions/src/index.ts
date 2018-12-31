'use strict';

import { startGame } from "./start-game";
import { initializeRouter } from "./init";

const router = initializeRouter();
export const { db, webApi } = router;
const { app } = router;

app.put('/rooms/:roomId/start', startGame);
