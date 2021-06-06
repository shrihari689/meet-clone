import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name: "Auth",
    initialState: {
        email: "",
        name: "",
        image: "",
        isLoggedIn: null,
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.name = payload.name
            state.email = payload.email
            state.image = payload.image
            state.isLoggedIn = payload.isLoggedIn
        }
    }
})

export const { setUser } = authSlice.actions


export default authSlice;