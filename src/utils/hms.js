import { HMSReactiveStore } from "@100mslive/hms-video-store";
import { isDevMode } from "./general";

const hms = new HMSReactiveStore();

const hmsActions = hms.getHMSActions();
const hmsStore = hms.getStore();
const hmsNotifications = hms.getNotifications();

const BACKEND_URL = isDevMode()
  ? "http://localhost:4000"
  : process.env.REACT_APP_BACKEND_URL;

export const createNewMeeting = async (user) => {
  return fetch(BACKEND_URL + "/newMeeting", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "X-API-Token": localStorage.getItem("firebase_access_token"),
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const joinExistingRoom = async (meetId) => {
  return fetch(BACKEND_URL + "/joinMeeting", {
    method: "POST",
    body: JSON.stringify({ meetId }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "X-API-Token": localStorage.getItem("firebase_access_token"),
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const previewRoom = (user, roomToken, meetId, config = {}) => {
  hmsActions.preview({
    userName: user.name,
    authToken: roomToken,
    settings: {
      isAudioMuted: true,
      isVideoMuted: true,
    },
    metaData: JSON.stringify({ user, meeting: { id: meetId } }),
    rememberDeviceSelection: true,
    ...config,
  });
};

export const joinRoom = (user, roomToken, meetId, config = {}) => {
  hmsActions.join({
    userName: user.name,
    authToken: roomToken,
    settings: {
      isAudioMuted: true,
      isVideoMuted: true,
    },
    metaData: JSON.stringify({ user, meeting: { id: meetId } }),
    rememberDeviceSelection: true,
    ...config,
  });
};

export { hmsActions, hmsStore, hmsNotifications };
