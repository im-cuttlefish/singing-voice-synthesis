import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Score, Note } from "./types";

const initialState: Score = {
  notes: [
    {
      pitch: "G3",
      from: 0,
      duration: 5,
    },
  ],
};

const slice = createSlice({
  name: "score",
  initialState,
  reducers: {
    addNote: (state, { payload }: PayloadAction<Note>) => {
      state.notes.push(payload);
    },
  },
});

export const scoreReducer = slice.reducer;
export const { addNote } = slice.actions;
