const ChatItem = ({ sender: { name }, text, time }) => {
    return (
        <div className="flex flex-col w-full my-2">
            <div className="text-sm">
                <span className="font-medium">{name}</span>
                <span className="font-normal text-xs text-gray-500 ml-1">{time}</span>
            </div>
            <div className="text-sm text-gray-800 mt-1">{text}</div>
        </div>
    );
}

export default ChatItem;