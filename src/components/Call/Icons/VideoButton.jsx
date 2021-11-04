import { hmsActions } from "../../../utils/hms";

const VideoButton = ({ localPeerVideo }) => {
  const isOn = localPeerVideo?.enabled;

  const toggleCam = (_) => {
    hmsActions.setLocalVideoEnabled(!isOn);
  };

  return (
    <div
      title={"Video " + (isOn ? "Off" : "On")}
      onClick={toggleCam}
      className={
        "h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " +
        (!isOn
          ? " bg-red-700 hover:bg-red-900"
          : " bg-gray-700 hover:bg-gray-800")
      }
    >
      <i className="google-material-icons" style={{ fontSize: "16px" }}>
        {!isOn ? "videocam_off" : "videocam"}
      </i>
    </div>
  );
};

export default VideoButton;
