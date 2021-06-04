import React from 'react';

const CallOptionButton = ({ icon, onClick }) => {
    return (
        <div onClick={onClick} className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-800">
            <i className="google-material-icons" style={{ fontSize: '18px' }}>{icon}</i>
        </div>
    );
}

export default CallOptionButton;