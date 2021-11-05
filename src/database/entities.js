export const User = {
  id: "",
  name: "",
  email: "",
  image: "",
};

export const TABS = {
  NO_SIDEBAR: "no_sidebar",
  INFO: "info",
  PEOPLE: "people",
  CHAT: "chat",
  ACTIVITIES: "activities",
  SECURITY: "security",
};

export const Call = {
  room: {},
  peers: {},
  tracks: {},
  messages: {},
  handRaised: {},
  hasUnseenMessages: false,
  isSidebarOpen: TABS.NO_SIDEBAR,
};
