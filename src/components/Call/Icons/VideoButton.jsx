import React, { useState, useEffect } from "react";
import { hmsActions } from "../../../utils/hms";

const VideoButton = ({ localPeerVideo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isOn = localPeerVideo?.enabled;

  useEffect(() => {
    if (isOn) setIsLoading(false);
  }, [isOn]);

  const toggleCam = (_) => {
    if (!isOn) setIsLoading(true);
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
      <i
        className={"google-material-icons " + (isLoading ? "animate-spin" : "")}
        style={{ fontSize: "16px" }}
      >
        {!isOn ? (isLoading ? "loop" : "videocam_off") : "videocam"}
      </i>
    </div>
  );
};

export default VideoButton;
