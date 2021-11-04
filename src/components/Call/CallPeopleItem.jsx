import { useEffect } from "react";
import { useRef } from "react";
import { hmsActions } from "../../utils/hms";
import MicAmplifyIcon from "./Icons/MicAmplifyIcon";

const CallPeopleItem = ({ people, audio, video }) => {
  const camVideoRef = useRef(null);
  const { user } = JSON.parse(people.customerDescription);

  const { name, image } = user;

  const isMicOn = Boolean(audio?.enabled);
  const isCamOn = Boolean(video?.enabled);

  useEffect(() => {
    if (isCamOn) {
      hmsActions.attachVideo(people.videoTrack, camVideoRef.current);
    } else {
      hmsActions.detachVideo(people.videoTrack, camVideoRef.current);
    }
  }, [isCamOn, people]);

  return (
    <div
      key={people.id}
      className="call-card flex flex-1 m-2 flex-col items-center justify-between bg-gray-800 p-3 rounded-md"
    >
      <div className="w-full flex justify-end">
        <MicAmplifyIcon isOn={isMicOn} />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <video
          autoPlay
          muted
          playsInline
          className={
            !isCamOn ? "hidden" : "rounded-md w-full h-full object-cover"
          }
          ref={camVideoRef}
        />
        <img
          className={isCamOn ? "hidden" : "h-18 w-18 rounded-full"}
          src={image}
          alt={name}
        />
      </div>
      <div className="w-full flex justify-start text-gray-300 font-medium text-sm py-1">
        {people.isLocal ? "You" : name}
      </div>
    </div>
  );
};

export default CallPeopleItem;
