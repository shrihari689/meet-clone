import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import ToggleButton from "../../Shared/Toggle"
import SidebarHeader from "../Shared/SidebarHeader";
import ChatItem from "./ChatItem";
import { getDateTimeString } from "../../../utils/time";
import socket from "./../../../utils/socket"
import { groupMessage } from "../../../utils/general";

const ChatList = ({ onClose, messages, currentUser, isHost, isChatDisabled }) => {

    const [message, setMessage] = useState("");
    const chatItems = useRef();

    useEffect(() => {
        chatItems.current?.scroll(10000, 10000)
    }, [messages]) // eslint-disable-line react-hooks/exhaustive-deps


    const handleSendMessage = (e) => {
        e.preventDefault();
        if (isChatDisabled) return;
        const messageToBeSent = message.trim();
        if (messageToBeSent)
            socket.emit("newMessage", JSON.stringify({
                id: Math.ceil(Math.random() * 10000),
                text: messageToBeSent,
                sender: currentUser,
            }))
        setMessage("");
    }

    return (
        <>
            <SidebarHeader title="In-call messages" onClose={onClose} />
            <div ref={chatItems} className="overflow-y-auto flex flex-col items-center flex-1 px-4">
                {
                    isHost &&
                    <div className="px-2 py-1 my-2 rounded-md bg-gray-100 text-gray-600 w-full flex items-center justify-between">
                        <span className="text-xs" style={{ fontSize: '11px' }}>Let everyone send messages</span>
                        <ToggleButton />
                    </div>
                }
                <div className="p-2 my-1 rounded-md text-center flex justify-center items-center bg-gray-100 text-gray-600 w-full text-xs">Messages can only be seen by people in the call and are deleted when the call ends.</div>
                <div className="flex-1 flex flex-col w-full mt-1">
                    {
                        groupMessage(messages).map((message, id) =>
                            <ChatItem {...message} key={id} />
                        )
                    }
                </div>
            </div>
            <div className="p-3 w-full relative">
                <form onSubmit={handleSendMessage}>
                    <textarea
                        disabled={isChatDisabled}
                        autoFocus={true}
                        value={message}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                                handleSendMessage(event);
                            }
                        }}
                        style={{ maxHeight: "2.25rem", minHeight: "" }}
                        onChange={({ target: { value } }) => setMessage(value)}
                        placeholder={isChatDisabled ? "Chat is disabled by the host" : "Send a message to everyone"}
                        className="w-full resize-none bg-gray-100 rounded-full py-2 pl-3 pr-10 outline-none placeholder-gray-500 text-sm"
                        type="text"
                    />
                    <button className="google-material-icons cursor-pointer focus:outline-none absolute top-5 right-6 text-gray-500" style={{ fontSize: '16px' }}>send</button>
                </form>
            </div>
        </>
    );
}

const mapStateToProps = ({ call, auth }) => ({
    messages: call.chats,
    isHost: call.isHost,
    isChatDisabled: !call.isHost && call.isChatDisabled,
    currentUser: auth
})

export default connect(mapStateToProps)(ChatList);