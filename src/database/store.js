import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth"
import callSlice from "./call"

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        call: callSlice.reducer
    },
})

export default store;