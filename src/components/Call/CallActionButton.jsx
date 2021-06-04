import React from 'react';

const CallActionButton = ({ icon, active, className }) => {
    return (
        <div
            onClick={() => { }}
            className={"h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " + className + (active ? " bg-red-700" : " bg-gray-700")}>
            <i className="google-material-icons" style={{ fontSize: '16px' }}>{icon}</i>
        </div>
    );
}

export default CallActionButton;