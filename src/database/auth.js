import { createSlice } from "@reduxjs/toolkit"
import { User } from "./entities"


const authSlice = createSlice({
    name: "Auth",
    initialState: {
        ...User,
        isLoggedIn: null,
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.id = payload.id
            state.name = payload.name
            state.email = payload.email
            state.image = payload.image
            state.isLoggedIn = payload.isLoggedIn
        }
    }
})

export const { setUser } = authSlice.actions


export default authSlice;