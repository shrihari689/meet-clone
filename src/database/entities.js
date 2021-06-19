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

export const TABS = {
    NO_SIDEBAR: "no_sidebar",
    INFO: "info",
    PEOPLE: "people",
    CHAT: "chat",
    ACTIVITIES: "activities",
    SECURITY: "security"
}

export const Call = {
    hostId: "",
    isHost: false,
    isChatDisabled: false,
    isCaptionEnabled: false,
    chats: [],
    refId: "",
    meetId: "",
    isMicOn: false,
    isCamOn: false,
    isSidebarOpen: TABS.NO_SIDEBAR,
    hasUnseenMessages: false,
    participants: []
}
