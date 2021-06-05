import React, { useState } from 'react';
import CallOptionButton from './../components/Call/CallOptionButton';
import CallActionButton from './../components/Call/CallActionButton';
import Time from './../components/Shared/Time';
import PeopleList from './../components/Call/People/PeopleList';
import ChatList from './../components/Call/Chat/ChatList';
import Sidebar from './../components/Call/Shared/Sidebar';
import CopyClipboard from './../components/Shared/CopyClipboard';
import CallInfo from './../components/Call/Info/CallInfo';
import CallActivities from './../components/Call/Activities/CallActivities';
import { isValidMeetId } from "./../utils/validator"
import { useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet"

const CallPage = ({ match: { params } }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState("no_sidebar");
    const pageRouter = useHistory();
    const { id: meetId } = params;

    if (!isValidMeetId(meetId)) {
        pageRouter.replace("/");
    }

    const handleChangeCallOption = (option) => {
        setIsSidebarOpen(prev => {
            if (prev === option) return "no_sidebar";
            return option;
        })
    }

    const handleCloseSidebar = () => {
        handleChangeCallOption("no_sidebar")
    }

    return (
        <main className="h-screen w-full flex flex-col justify-between bg-gray-900 overflow-hidden">
            <Helmet>
                <title>{meetId} - Google Meet Clone | @shrihari689</title>
            </Helmet>
            <div className="w-full h-screen flex p-3 pb-14">
                <div className="flex-col items-center justify-between flex-1 px-2 flex">
                    <div className="w-full flex justify-end">
                        <i className="material-icons text-white" style={{ fontSize: '16px' }}>mic_off</i>
                    </div>
                    <div className="flex items-center justify-center flex-1 w-full">
                        <img className="h-18 w-18 rounded-full" src="https://lh3.googleusercontent.com/a-/AOh14GhinDC_5_G9VLzmIbRW5L0d8f6w6Kg92VxIKWSu=s120-p-k-no-mo" alt="Shri Hari L" />
                    </div>
                    <div className="w-full flex justify-start text-white text-sm">You</div>
                </div>
                <Sidebar isOpen={isSidebarOpen !== "no_sidebar"}>
                    {isSidebarOpen === "info" && <CallInfo onClose={handleCloseSidebar} />}
                    {isSidebarOpen === "people" && <PeopleList onClose={handleCloseSidebar} />}
                    {isSidebarOpen === "chat" && <ChatList onClose={handleCloseSidebar} />}
                    {isSidebarOpen === "activities" && <CallActivities onClose={handleCloseSidebar} />}
                </Sidebar>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gray-900 flex flex-col space-y-2 md:flex-row items-center justify-between text-sm text-white px-3 pb-3">
                <div className="flex items-center">
                    <Time className="text-xs" />
                    <span className="mx-2 font-thin">|</span>
                    <CopyClipboard text={meetId} className="cursor-pointer" />
                </div>
                <div className="flex items-center">
                    <CallActionButton
                        title="Audio on/off"
                        icon="mic_off"
                        active={true}
                    />
                    <CallActionButton
                        title="Video on/off"
                        icon="videocam_off"
                        active={true}
                    />
                    <CallActionButton
                        title="Closed Caption"
                        icon="closed_caption"
                        active={false}
                    />
                    <CallActionButton
                        title="Raise Hands"
                        icon="pan_tool"
                        active={false}
                    />
                    <CallActionButton
                        title="Share Screen"
                        icon="present_to_all"
                        active={false}
                    />
                    <CallActionButton
                        title="More"
                        icon="more_vert"
                        active={false}
                    />
                    <CallActionButton
                        onClick={(_) => { pageRouter.push("home") }}
                        title="Leave Call"
                        icon="call_end"
                        className="w-14"
                        active={true}
                    />
                </div>
                <div className="flex items-center">
                    <CallOptionButton
                        title="Info"
                        iconSet={(isSidebarOpen === "info") ? "material-icons" : "google-material-icons"}
                        icon="info"
                        onClick={(_) => handleChangeCallOption("info")}
                    />
                    <CallOptionButton
                        title="Participants"
                        icon="group"
                        iconSet={(isSidebarOpen === "people") ? "material-icons" : "google-material-icons"}
                        onClick={(_) => handleChangeCallOption("people")} />
                    <CallOptionButton
                        title="Chat"
                        icon="chat"
                        iconSet={(isSidebarOpen === "chat") ? "material-icons" : "google-material-icons"}
                        onClick={(_) => handleChangeCallOption("chat")} />
                    <CallOptionButton
                        title="Activities"
                        iconSet="google-material-icons"
                        icon="themes"
                        onClick={(_) => handleChangeCallOption("activities")}
                    />
                    <CallOptionButton
                        title="Host Controls"
                        iconSet={(isSidebarOpen === "controls") ? "material-icons" : "google-material-icons"}
                        icon="security"
                    />
                </div>
            </div>
        </main>
    );
}

export default CallPage;
