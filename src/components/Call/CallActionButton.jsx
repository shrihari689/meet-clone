import React from 'react';

const CallActionButton = ({ icon, active, className, title, onClick }) => {
    return (
        <div
            title={title}
            onClick={onClick}
            className={"h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " + className + (active ? " bg-red-700 hover:bg-red-900" : " bg-gray-700 hover:bg-gray-800")}>
            <i className="google-material-icons" style={{ fontSize: '16px' }}>{icon}</i>
        </div>
    );
}

export default CallActionButton;