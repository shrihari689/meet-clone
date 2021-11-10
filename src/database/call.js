import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { countUnreadMessages } from "../utils/general";
import { Call, TABS } from "./entities";

const callSlice = createSlice({
  name: "Call",
  initialState: Call,
  reducers: {
    setCallInfo: (state, { payload }) => {
      if (!payload.room.isConnected && payload.room.roomState !== "Preview")
        return Call;
      state.room = payload.room;
      state.peers = payload.peers;
      state.tracks = payload.tracks;
      const messages = payload.messages.byID;
      state.messages = Object.keys(messages)
        .map((e) => ({
          ...messages[e],
          time: dayjs(messages[e].time).format("hh:mm A"),
        }))
        .filter((e) => e.type === "chat");
      if (!(state.pinnedParticipant in state.peers))
        state.pinnedParticipant = null;
      state.hasUnseenMessages = countUnreadMessages(state.messages) !== 0;
    },
    setIsSidebarOpen: (state, { payload }) => {
      if (state.isSidebarOpen === payload) {
        state.isSidebarOpen = TABS.NO_SIDEBAR;
      } else {
        state.isSidebarOpen = payload;
      }
    },
    raiseHand: (state, { payload }) => {
      state.handRaised[payload] = true;
    },
    lowerHand: (state, { payload }) => {
      const newHandRaised = { ...state.handRaised };
      delete newHandRaised[payload];
      state.handRaised = newHandRaised;
    },
    lowerAllHands: (state, _) => {
      state.handRaised = {};
    },
    pinParticipant: (state, { payload }) => {
      if (state.pinnedParticipant === payload) {
        state.pinnedParticipant = null;
      } else {
        state.pinnedParticipant = payload;
      }
    },
    resetCall: (_) => Call,
  },
});

export const {
  setCallInfo,
  resetCall,
  lowerHand,
  raiseHand,
  setIsSidebarOpen,
  pinParticipant,
} = callSlice.actions;

export default callSlice;
