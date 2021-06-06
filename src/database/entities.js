export const User = {
    id: "",
    name: "",
    email: "",
    image: ""
}

export const Message = {
    id: "",
    text: "",
    sender: User,
    time: ""
}

export const Call = {
    host: User,
    isHost: false,
    chats: [],
    lastSeenMessage: [],
    participants: []
}