export const isDevMode = () => process.env.NODE_ENV === "development";

export const countUnreadMessages = (messages = []) => {
  const isUnread = messages.some((message) => !message.read);
  return isUnread ? 1 : 0;
};
