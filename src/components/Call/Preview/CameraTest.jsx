import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { hmsActions } from "../../../utils/hms";

const PreviewCameraTest = ({ isCamOn, isMicOn, videoTrack }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (isCamOn && videoTrack?.id) {
      hmsActions.attachVideo(videoTrack?.id, videoRef.current);
    } else {
      hmsActions.detachVideo(videoTrack?.id, videoRef.current);
    }
  }, [isCamOn, videoTrack?.id]);

  const handleToggleMic = () => {
    hmsActions.setLocalAudioEnabled(!isMicOn);
  };

  const handleToggleCam = () => {
    hmsActions.setLocalVideoEnabled(!isCamOn);
  };

  return (
    <div className="bg-gray-900 select-none w-4/5 md:w-2/5 h-80 text-white relative rounded-md overflow-hidden">
      <video
        autoPlay
        muted
        playsInline
        ref={videoRef}
        className="w-full h-full object-cover"
      ></video>
      <div
        className={
          "flex-col items-center justify-center w-full h-full absolute top-0 " +
          (!isCamOn ? "flex" : "hidden")
        }
      >
        <i className="material-icons text-gray-300 text-4xl">videocam_off</i>
        <p className="mt-5">You camera is off</p>
      </div>
      <div className="absolute bottom-0 pb-5 w-full flex justify-center items-center space-x-5">
        <button
          onClick={handleToggleMic}
          className={
            "preview_icon " + (isMicOn ? "preview_icon_on" : "preview_icon_off")
          }
        >
          <i className="material-icons">{isMicOn ? "mic" : "mic_off"}</i>
        </button>
        <button
          onClick={handleToggleCam}
          className={
            "preview_icon " + (isCamOn ? "preview_icon_on" : "preview_icon_off")
          }
        >
          <i className="material-icons">
            {isCamOn ? "videocam" : "videocam_off"}
          </i>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ call }) => {
  const videoTrack = call.tracks[call.peers[call.room.localPeer]?.videoTrack];
  const audioTrack = call.tracks[call.peers[call.room.localPeer]?.audioTrack];
  return {
    videoTrack,
    audioTrack,
    isCamOn: videoTrack?.enabled,
    isMicOn: audioTrack?.enabled,
  };
};

export default connect(mapStateToProps)(PreviewCameraTest);
