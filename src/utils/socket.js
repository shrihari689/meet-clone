import { io } from "socket.io-client"
import { isDevMode } from "./general"

const backendURL = isDevMode() ? "http://localhost:4000" : process.env.REACT_APP_BACKEND_URL
const socket = io(backendURL)

export default socket;