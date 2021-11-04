import { useEffect } from "react";
import { connect } from "react-redux";
import { hmsActions } from "../../../utils/hms";

const MicButton = ({ localPeerAudio }) => {
  const isOn = localPeerAudio?.enabled;

  const toggleMic = (_) => {
    hmsActions.setLocalAudioEnabled(!isOn);
  };

  return (
    <div
      title={"Audio " + (isOn ? "Off" : "On")}
      onClick={toggleMic}
      className={
        "h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " +
        (!isOn
          ? " bg-red-700 hover:bg-red-900"
          : " bg-gray-700 hover:bg-gray-800")
      }
    >
      <i className="google-material-icons" style={{ fontSize: "16px" }}>
        {isOn ? "mic" : "mic_off"}
      </i>
    </div>
  );
};

export default MicButton;
