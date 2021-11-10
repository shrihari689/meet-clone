import { useState } from "react";
import { Redirect } from "react-router-dom";
import { createNewMeeting } from "../../utils/hms";

const NewMeetingButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState({ meetId: "", token: "" });

  if (room.meetId) {
    return (
      <Redirect
        to={{
          pathname: `/join/${room.meetId}`,
          state: room,
        }}
      />
    );
  }

  const handleNewMeeting = (_) => {
    setIsLoading(true);
    createNewMeeting()
      .then((room) => setRoom(room))
      .catch((err) => console.log(err));
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleNewMeeting}
      className="flex items-center text-white cursor-pointer select-none mt-2 ml-2 p-2 rounded-sm bg-indigo-600 hover:bg-indigo-800 disabled:cursor-not-allowed disabled:bg-indigo-400"
    >
      {isLoading ? (
        <i className="material-icons animate-spin">sync</i>
      ) : (
        <i className="material-icons">video_call</i>
      )}
      <span className="ml-2 text-sm">New Meeting</span>
    </button>
  );
};

export default NewMeetingButton;
