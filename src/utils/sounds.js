const playAudio = (name) => {
  try {
    const audio = document.getElementById(name);
    if (!audio) return;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {})
        .catch((_) => {
          console.log(
            "Some Error Occured! Arasiyalla Idhellam Saadharnamappa!"
          );
        });
    }
  } catch (_) {
    console.log("Some Error Occured! Arasiyalla Idhellam Saadharnamappa!");
  }
};

export const playJoiningSound = () => playAudio("JOIN_CALL_AUDIO");

export const playLeavingSound = () => playAudio("LEAVE_CALL_AUDIO");

export const playIncomingMessageSound = () => playAudio("NEW_MESSAGE_AUDIO");
