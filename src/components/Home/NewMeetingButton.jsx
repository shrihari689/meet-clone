import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { joinNewMeeting } from "../../utils/hms";

const NewMeetingButton = ({ currentUser, peers, room }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (room.isConnected) {
    const peer = JSON.parse(peers[room.localPeer].customerDescription);
    const meetId = peer.meeting.id;
    return <Redirect to={`/${meetId}`} />;
  }

  const handleNewMeeting = (_) => {
    setIsLoading(true);
    joinNewMeeting(currentUser);
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleNewMeeting}
      className={
        "flex items-center text-white cursor-pointer select-none mt-2 ml-2 p-2 rounded-sm " +
        (isLoading
          ? "cursor-not-allowed bg-indigo-400"
          : "bg-indigo-600 hover:bg-indigo-800")
      }
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

const mapStateToProps = (state) => ({
  currentUser: state.auth,
  peers: state.call.peers,
  room: state.call.room,
});

export default connect(mapStateToProps)(NewMeetingButton);
