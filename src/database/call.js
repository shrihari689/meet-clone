import { createSlice } from "@reduxjs/toolkit";
import { playIncomingMessageSound } from "../utils/sounds";
import { Call, TABS } from "./entities";

const callSlice = createSlice({
  name: "Call",
  initialState: Call,
  reducers: {
    setCallInfo: (state, { payload }) => {
      state.room = payload.room;
      state.peers = payload.peers;
      state.tracks = payload.tracks;
      state.messages = payload.messages;
    },
    setIsSidebarOpen: (state, { payload }) => {
      state.isSidebarOpen = payload;
    },
    resetCall: (_) => Call,
  },
});

export const { setCallInfo, resetCall, setIsSidebarOpen } = callSlice.actions;

export default callSlice;
