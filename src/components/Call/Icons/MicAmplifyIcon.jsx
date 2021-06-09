const MicAmplifyIcon = ({ isOn }) => {

    if (isOn)
        return (
            <div className="flex items-center h-6 bg-indigo-800 p-2 rounded-full">
                <div className="animate-mic animate-mic-1 w-1 mr-1 bg-gray-100 rounded-full"></div>
                <div className="animate-mic animate-mic-2 w-1 mr-1 bg-gray-100 rounded-full"></div>
                <div className="animate-mic animate-mic-3 w-1 bg-gray-100 rounded-full"></div>
            </div>
        )

    return (
        <div className="flex items-center h-6 p-2 rounded-full">
            <i className="material-icons text-white" style={{ fontSize: '16px' }}>mic_off</i>
        </div>
    );
}

export default MicAmplifyIcon;