import { HMSReactiveStore } from "@100mslive/hms-video-store";

const hms = new HMSReactiveStore();

hms.triggerOnSubscribe();

const hmsActions = hms.getHMSActions();
const hmsStore = hms.getStore();
const hmsNotifications = hms.getNotifications();

export const generateTokenFromId = (id) => {
  return process.env.REACT_APP_HMS_TOKEN;
};

export const joinNewMeeting = (id, user) => {
  const token = generateTokenFromId(id);
  const config = {
    userName: user.name,
    authToken: token, // client-side token generated from your token service
    settings: {
      isAudioMuted: true,
      isVideoMuted: true,
    },
    metaData: JSON.stringify({ user, meeting: { id, host: true } }),
    rememberDeviceSelection: true, // remember manual device change
  };

  hmsActions.join(config);
};

export { hmsActions, hmsStore, hmsNotifications };
