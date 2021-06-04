import { useEffect, useRef, useState } from "react";
import ToggleButton from "../../Shared/Toggle"
import SidebarHeader from "../Shared/SidebarHeader";
import ChatItem from "./ChatItem";

const MESSAGES = [
    { message: "Good morning mam 🚀", senderName: "You", time: "12:14 PM" },
    { message: "Gm mam!", senderName: "NITHARSHAN D J", time: "12:14 PM" },
    { message: "191EC108", senderName: "AJAY KOUSHIK K N", time: "12:16 PM" },
    { message: "Mam one doubt!", senderName: "MOHAMED NOWFAL A", time: "12:18 PM" },
    { message: "Your voice is breaking mam", senderName: "NAVEEN KUMAR A", time: "12:19 PM" }
]

const ChatList = ({ onClose }) => {

    const [messages, setMessages] = useState(MESSAGES);
    const [message, setMessage] = useState("");
    const chatItems = useRef();

    useEffect(() => {
        console.log(chatItems.current)
        chatItems.current?.scroll(10000, 10000)
    }, [messages, chatItems])

    const handleSendMessage = (e) => {
        e.preventDefault();
        const messageToBeSent = message.trim();
        if (messageToBeSent)
            setMessages(prev => ([
                ...prev,
                { message: messageToBeSent, senderName: "You", time: "12:25 PM" }
            ]))
        setMessage("");
    }

    return (
        <>
            <SidebarHeader title="In-call messages" onClose={onClose} />
            <div ref={chatItems} className="overflow-y-auto flex flex-col items-center flex-1">
                <div className="px-2 py-1 my-2 rounded-md bg-gray-100 text-gray-600 w-11/12 flex items-center justify-between">
                    <span className="text-xs" style={{ fontSize: '11px' }}>Let everyone send messages</span>
                    <ToggleButton on={true} onChange={(_) => { }} />
                </div>
                <div className="p-2 my-1 rounded-md text-center flex justify-center items-center bg-gray-100 text-gray-600 w-11/12 text-xs">Messages can only be seen by people in the call and are deleted when the call ends.</div>
                <div className="flex-1 flex flex-col w-full px-4 mt-1">
                    {
                        messages.map((message, id) =>
                            <ChatItem {...message} key={id} />
                        )
                    }
                </div>
            </div>
            <div className="p-3 w-full relative">
                <form onSubmit={handleSendMessage}>

                    <input
                        value={message}
                        onChange={({ target: { value } }) => setMessage(value)}
                        placeholder="Send a message to everyone"
                        className="w-full bg-gray-100 rounded-full py-2 pl-3 pr-10 outline-none placeholder-gray-500 text-sm"
                        type="text"
                    />
                    <button className="google-material-icons cursor-pointer absolute top-5 right-6 text-gray-500" style={{ fontSize: '16px' }}>send</button>
                </form>
            </div>
        </>
    );
}

export default ChatList;