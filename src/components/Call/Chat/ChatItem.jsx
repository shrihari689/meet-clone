const ChatItem = ({ senderName, message, time }) => {
    return (
        <div className="flex flex-col w-full my-2">
            <div className="text-sm">
                <span className="font-semibold">{senderName}</span>
                <span className="font-normal text-xs text-gray-500 ml-1">{time}</span>
            </div>
            <div className="text-sm text-gray-800 mt-1">{message}</div>
        </div>
    );
}

export default ChatItem;