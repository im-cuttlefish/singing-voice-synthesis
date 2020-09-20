import { combineReducers } from "@reduxjs/toolkit";
import { scoreReducer } from "../features/score/slice";

export const rootReducer = combineReducers({
  score: scoreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
