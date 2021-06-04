import React from 'react';

const CallOptionButton = ({ icon, onClick, title, iconSet }) => {
    return (
        <div title={title} onClick={onClick} className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-800">
            <i className={iconSet} style={{ fontSize: '18px' }}>{icon}</i>
        </div>
    );
}

export default CallOptionButton;