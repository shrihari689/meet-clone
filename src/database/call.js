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
        resetCall: _ => Call
    }
})

export const { setCallInfo, addMessage, resetCall } = callSlice.actions


export default callSlice;