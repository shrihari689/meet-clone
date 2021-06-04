import ToggleButton from "../../Shared/Toggle"
import SidebarHeader from "../Shared/SidebarHeader";
import ChatItem from "./ChatItem";

const ChatList = () => {
    return (
        <div className="flex flex-col items-center justify-between rounded-md w-1/2 pt-3 bg-white">
            <SidebarHeader title="In-call messages" onClose={() => { }} />
            <div className="px-2 py-1 my-2 rounded-md bg-gray-100 text-gray-600 w-11/12 flex items-center justify-between">
                <span className="text-xs" style={{ fontSize: '11px' }}>Let everyone send messages</span>
                <ToggleButton on={true} onChange={(_) => { }} />
            </div>
            <div className="p-2 my-1 rounded-md text-center flex justify-center items-center bg-gray-100 text-gray-600 w-11/12 text-xs">Messages can only be seen by people in the call and are deleted when the call ends.</div>
            <div className="flex-1 flex flex-col w-full px-4 mt-1">
                <ChatItem message="Good morning mam 🚀" senderName="You" time="12:14 PM" />
                <ChatItem message="Gm mam!" senderName="NITHARSHAN D J" time="12:14 PM" />
                <ChatItem message="191EC108" senderName="AJAY KOUSHIK K N" time="12:16 PM" />
                <ChatItem message="Mam one doubt!" senderName="MOHAMED NOWFAL A" time="12:18 PM" />
                <ChatItem message="Your voice is breaking mam" senderName="NAVEEN KUMAR A" time="12:19 PM" />
            </div>
            <div className="p-3 w-full relative">
                <input placeholder="Send a message to everyone" className="w-full bg-gray-100 rounded-full py-2 pl-3 pr-10 outline-none placeholder-gray-500 text-sm" type="text" />
                <i className="google-material-icons cursor-pointer absolute top-5 right-6 text-gray-500" style={{ fontSize: '16px' }}>send</i>
            </div>
        </div>
    );
}

export default ChatList;