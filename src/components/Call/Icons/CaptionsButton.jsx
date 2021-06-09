import { useState } from "react";

const CaptionsButton = () => {

    const [isOn, setIsOn] = useState(false);

    const toggleCaptions = (_) => {
        setIsOn(prev => !prev)
    }

    return (
        <div
            title={"Captions " + (isOn ? "Off" : "On")}
            onClick={toggleCaptions}
            className={"h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " + (isOn ? " bg-yellow-600 hover:bg-yellow-500" : " bg-gray-700 hover:bg-gray-800")}>
            <i className="google-material-icons" style={{ fontSize: '16px' }}>
                closed_caption
            </i>
        </div>
    );
}

export default CaptionsButton;