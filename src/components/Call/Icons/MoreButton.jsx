import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const MoreButton = () => {

    const [isOn, setIsOn] = useState(false);
    const dialogRef = useRef();

    useEffect(() => {
        dialogRef.current?.focus()
    }, [isOn])

    const toggleMoreButton = (_) => {
        setIsOn(prev => !prev)
    }

    const handleSelection = (option) => {
        console.log(option)
        toggleMoreButton()
    }

    return (
        <div className="relative flex items-center">
            <div
                tabIndex={0}
                title="More"
                onFocus={_ => setIsOn(true)}
                className={"h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " + (isOn ? " bg-yellow-600 hover:bg-yellow-500" : " bg-gray-700 hover:bg-gray-800")}>
                <i className="google-material-icons" style={{ fontSize: '16px' }}>
                    more_vert
                </i>
            </div>
            {
                isOn &&
                <div
                    tabIndex={1}
                    onBlur={_ => setIsOn(false)}
                    ref={dialogRef}
                    className="absolute  bottom-10 -left-5 bg-gray-100 rounded-md">
                    <div
                        onClick={_ => handleSelection("record")}
                        className="text-gray-700 px-5 py-2 cursor-pointer my-1 hover:bg-gray-300 w-full">
                        Record
                    </div>
                    <div
                        onClick={_ => handleSelection("settings")}
                        className="text-gray-700 px-5 py-2 cursor-pointer my-1 hover:bg-gray-300 w-full">
                        Settings
                    </div>
                </div>
            }
        </div>
    );
}

export default MoreButton;