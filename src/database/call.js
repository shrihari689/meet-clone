import { createSlice } from "@reduxjs/toolkit"
import { Call } from "./entities"

const callSlice = createSlice({
    name: "Call",
    initialState: Call,
    reducers: {
        setCallInfo: (state, { payload }) => {
            state.host = payload.host
            state.isHost = payload.isHost
            state.participants = payload.participants
        },
        addMessage: (state, { payload }) => {
            state.chats.push(payload)
        },
        updateParticipants: (state, { payload }) => {
            const participants = Object.keys(payload).map(e => payload[e])
            state.participants = participants
            state.participants.sort()
        },
        addParticipant: (state, { payload }) => {
            state.participants.push(payload)
            state.participants.sort()
        },
        removeParticipant: (state, { payload }) => {
            state.participants = state.participants.filter(e => e.refId !== payload.refId)
        },
        resetCall: _ => Call
    }
})

export const
    {
        setCallInfo,
        addMessage,
        resetCall,
        updateParticipants,
        addParticipant,
        removeParticipant
    } = callSlice.actions


export default callSlice;