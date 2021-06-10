import { createSlice } from "@reduxjs/toolkit"
import { playIncomingMessageSound } from "../utils/sounds"
import { Call, TABS } from "./entities"

const callSlice = createSlice({
    name: "Call",
    initialState: Call,
    reducers: {
        setCallInfo: (state, { payload }) => {
            state.refId = payload.refId
            state.meetId = payload.meetId
        },
        setHostInfo: (state, { payload }) => {
            state.hostId = payload.hostId
            state.isHost = payload.isHost
            state.isChatDisabled = payload.isChatDisabled
        },
        addMessage: (state, { payload }) => {
            state.chats.push(payload)
            const isUnseenState = state.isSidebarOpen !== TABS.CHAT
            state.hasUnseenMessages = isUnseenState
            if (isUnseenState)
                playIncomingMessageSound()
        },
        updateParticipants: (state, { payload }) => {
            const participants = Object.keys(payload).map(e => payload[e])
            state.participants = participants
            state.participants.sort()
        },
        addParticipant: (state, { payload }) => {
            state.participants.push(payload)
        },
        removeParticipant: (state, { payload }) => {
            state.participants = state.participants.filter(e => e.refId !== payload.refId)
        },
        updateParticipant: (state, { payload }) => {
            state.participants = state.participants.filter(e => e.refId !== payload.refId)
            state.participants.push(payload)
        },
        toggleMic: state => {
            state.isMicOn = !state.isMicOn
        },
        toggleVideo: state => {
            state.isCamOn = !state.isCamOn
        },
        addStream: (state, { payload }) => {
            state.camStream = payload
        },
        removeStream: state => {
            state.camStream = null
        },
        setIsSidebarOpen: (state, { payload }) => {
            if (payload === TABS.CHAT)
                state.hasUnseenMessages = false
            if (state.isSidebarOpen === payload)
                state.isSidebarOpen = TABS.NO_SIDEBAR;
            else
                state.isSidebarOpen = payload
        },
        updateMeetSettings: (state, { payload }) => {
            const { isChatDisabled } = payload
            if (isChatDisabled !== undefined)
                state.isChatDisabled = isChatDisabled
        },
        resetCall: _ => Call
    }
})

export const
    {
        setCallInfo,
        setHostInfo,
        addMessage,
        resetCall,
        toggleMic,
        toggleVideo,
        addParticipant,
        updateParticipant,
        removeParticipant,
        updateParticipants,
        updateMeetSettings,
        addStream,
        removeStream,
        setIsSidebarOpen,
    } = callSlice.actions


export default callSlice;