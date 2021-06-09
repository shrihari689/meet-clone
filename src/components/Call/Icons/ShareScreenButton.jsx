import { useState } from "react";

const ShareScreenButton = () => {

    const [isOn, setIsOn] = useState(false);

    const toggleShareScreen = (_) => {
        setIsOn(prev => !prev)
    }

    return (
        <div
            title={(isOn ? "Stop Presenting" : "Share Screen")}
            onClick={toggleShareScreen}
            className={"h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " + (isOn ? " bg-yellow-600 hover:bg-yellow-500" : " bg-gray-700 hover:bg-gray-800")}>
            <i className="google-material-icons" style={{ fontSize: '16px' }}>
                {isOn ? "close" : "present_to_all"}
            </i>
        </div>
    );
}

export default ShareScreenButton;