import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { countUnreadMessages } from "../utils/general";
import { Call, TABS } from "./entities";

const callSlice = createSlice({
  name: "Call",
  initialState: Call,
  reducers: {
    setCallInfo: (state, { payload }) => {
      if (!payload.room.isConnected) return Call;
      state.room = payload.room;
      state.peers = payload.peers;
      state.tracks = payload.tracks;
      const messages = payload.messages.byID;
      state.messages = Object.keys(messages).map((e) => ({
        ...messages[e],
        time: dayjs(messages[e].time).format("hh:mm A"),
      }));
      state.hasUnseenMessages = countUnreadMessages(state.messages) !== 0;
    },
    setIsSidebarOpen: (state, { payload }) => {
      if (state.isSidebarOpen === payload) {
        state.isSidebarOpen = TABS.NO_SIDEBAR;
      } else {
        state.isSidebarOpen = payload;
      }
    },
    resetCall: (_) => Call,
  },
});

export const { setCallInfo, resetCall, setIsSidebarOpen } = callSlice.actions;

export default callSlice;
