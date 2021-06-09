import { useEffect } from "react";
import { useRef } from "react";
import MicAmplifyIcon from "./Icons/MicAmplifyIcon";

const CallPeopleItem = ({ refId, name, isMicOn, isCamOn, image, currentRefId }) => {

    const camVideoRef = useRef();

    useEffect(() => {
        if (currentRefId && (currentRefId === refId)) {
            if (isCamOn) {
                if (camVideoRef.current && !camVideoRef.current.srcObject)
                    navigator.mediaDevices
                        .getUserMedia({ video: true, audio: true })
                        .then(stream => {
                            camVideoRef.current.srcObject = stream;
                            camVideoRef.current.muted = true;
                            camVideoRef.current.play();

                        }).catch(err => {
                            console.log(err);
                        })
            } else {
                const stream = camVideoRef.current.srcObject;
                stream?.getTracks()?.forEach(track => {
                    track.stop()
                    stream.removeTrack(track)
                })
                camVideoRef.current.srcObject = null;
            }
        }
    }, [isCamOn, isMicOn]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            key={refId}
            className="call-card flex flex-1 m-2 flex-col items-center justify-between bg-gray-800 p-3 rounded-md"
        >
            <div className="w-full flex justify-end">
                <MicAmplifyIcon isOn={isMicOn} />
            </div>
            <div className="flex items-center justify-center">
                <video
                    className={(!isCamOn ? "hidden" : "rounded-md w-full h-full object-cover")}
                    ref={camVideoRef}
                />
                <img
                    className={isCamOn ? "hidden" : "h-18 w-18 rounded-full"}
                    src={image}
                    alt={name}
                />
            </div>
            <div className="w-full flex justify-start text-gray-300 font-medium text-sm py-1">
                {name}
            </div>
        </div>
    );
}

export default CallPeopleItem;