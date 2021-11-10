import { database } from "../utils/firebase";

export const getMeetRef = (meetId) => {
  return database.ref().child("Meetings").child(meetId);
};

export const getMeetDetails = (meetId) => {
  return getMeetRef(meetId).get();
};
