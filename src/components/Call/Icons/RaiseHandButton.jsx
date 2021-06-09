import { useState } from "react";

const RaiseHandButton = () => {

    const [isOn, setIsOn] = useState(false);

    const toggleHand = (_) => {
        setIsOn(prev => !prev)
    }

    return (
        <div
            title={(isOn ? "Lower Hands" : "Raise Hands")}
            onClick={toggleHand}
            className={"h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " + (isOn ? " bg-yellow-600 hover:bg-yellow-500" : " bg-gray-700 hover:bg-gray-800")}>
            <i className="google-material-icons" style={{ fontSize: '16px' }}>
                pan_tool
            </i>
        </div>
    );
}

export default RaiseHandButton;