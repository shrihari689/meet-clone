import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CameraTest from "../components/Call/Preview/CameraTest";
import NavBar from "../components/Shared/NavBar";
import { getMeetDetails } from "../database/fires";
import {
  hmsActions,
  joinExistingRoom,
  joinRoom,
  previewRoom,
} from "../utils/hms";

const PreviewPage = ({ match, location, user, room }) => {
  const [roomToken, setRoomToken] = useState(() => location?.state?.token);
  const [isRoomNotFound, setIsRoomNotFound] = useState(false);
  const meetId = match.params.id;

  useEffect(() => {
    console.log("Connecting..");
    if (roomToken) {
      previewRoom(user, roomToken, meetId);
    } else {
      getMeetDetails(meetId).then((res) => {
        if (res.exists()) {
          joinExistingRoom(meetId).then((room) => setRoomToken(room.token));
        } else {
          setIsRoomNotFound(true);
        }
      });
    }
  }, [meetId, roomToken, user]);

  const handleEndPreview = () => {
    hmsActions.leave();
  };

  const handleJoinMeeting = () => {
    joinRoom(user, roomToken, meetId);
  };

  if (room.isConnected) return <Redirect to={`/${meetId}`} />;
  if (isRoomNotFound) return <Redirect to="/home" />;

  return (
    <>
      <Helmet>
        <title>{meetId} - Google Meet Clone | @shrihari689</title>
      </Helmet>
      <NavBar />
      <main className="mt-10 md:mt-14 flex items-center flex-col justify-center">
        <CameraTest />
        <div className="mt-5 w-full flex md:flex-row flex-col items-center justify-center">
          <button
            onClick={handleJoinMeeting}
            className="flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-800 cursor-pointer select-none my-4 mx-2 sm:w-40 w-1/2 py-3 rounded-full  transform hover:scale-105 transition-all duration-200 ease-in-out active:scale-90"
          >
            Join
          </button>
          <button
            onClick={handleEndPreview}
            className="flex items-center justify-center text-white bg-red-600 hover:bg-red-800 cursor-pointer select-none my-4 mx-2 sm:w-40 w-1/2 py-3 rounded-full  transform hover:scale-105 transition-all duration-200 ease-in-out active:scale-90"
          >
            Cancel
          </button>
        </div>
      </main>
    </>
  );
};

const mapStateToProps = ({ auth, call }) => ({
  user: auth,
  room: call.room,
  videoTrack: call.tracks[call.peers[call.room.localPeer]?.videoTrack],
});

export default connect(mapStateToProps)(PreviewPage);
