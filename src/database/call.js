import { createSlice } from "@reduxjs/toolkit"
import { User } from "./entities"

const callSlice = createSlice({
    name: "Call",
    initialState: {
        host: User,
        isHost: false,
        chats: [],
        lastSeenMessage: [],
        participants: []
    },
    reducers: {
        setCallInfo: (state, { payload }) => {
            state.host = payload.host
            state.isHost = payload.isHost
            state.participants = payload.participants
        },
        addMessage: (state, { payload }) => {
            state.chats.push(payload)
        }
    }
})

export const { setUser } = callSlice.actions


export default callSlice;