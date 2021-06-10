import firebase, { database } from "../utils/firebase"

export const getMeetRef = (meetId) => {
    return database.ref().child("Meetings").child(meetId)
}

export const getParticipantRef = (meetId, userId) => {
    return database.ref().child(meetId).child(userId);
}

export const createNewMeeting = (meetId, meetHost) => {
    getMeetRef().onDisconnect().update({
        adminDisconnected: true
    })
    return getMeetRef().set({
        meetId,
        meetHost,
        isChatDisabled: false,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    })
}

export const getMeetDetails = (meetId) => {
    return getMeetRef(meetId).get()
}

export const updateParticipantDetails = () => {

}