import joinAudio from "../assets/audio/join_call.ogg"
import leaveAudio from "../assets/audio/leave_call.ogg"
import messageAudio from "../assets/audio/group_chat_received.mp3"

const playAudio = (name) => {
    try {
        const audio = new Audio(name);
        var playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
            }).catch(_ => {
                console.log("Some Error Occured! Arasiyalla Idhellam Saadharnamappa!")
            });
        }
    } catch (_) {
        console.log("Some Error Occured! Arasiyalla Idhellam Saadharnamappa!")
    }
}

export const playJoiningSound = () => playAudio(joinAudio)

export const playLeavingSound = () => playAudio(leaveAudio)

export const playIncomingMessageSound = () => playAudio(messageAudio)
