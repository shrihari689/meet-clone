import React, { useState, useEffect } from 'react';
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
import { connect } from 'react-redux';
import { addMessage, resetCall, updateParticipants, addParticipant, removeParticipant } from '../database/call';
import socket from "./../utils/socket"
import { database } from "./../utils/firebase"

const TABS = {
    NO_SIDEBAR: "no_sidebar",
    INFO: "info",
    PEOPLE: "people",
    CHAT: "chat",
    ACTIVITIES: "activities",
    SECURITY: "security"
}

const CallPage = ({ match, participants, addMessage, endCall, currentUser, updateParticipants, addParticipant, removeParticipant }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(TABS.NO_SIDEBAR);
    const pageRouter = useHistory();
    const { params: { id: meetId } } = match;

    useEffect(() => {
        if (isValidMeetId(meetId)) {
            socket.emit("joinCall", JSON.stringify({ meetId }))
            socket.off("newMessage");
            socket.on("newMessage", (data) => {
                const payload = JSON.parse(data)
                addMessage(payload)
            })
            const meetRef = database.ref().child(meetId)
            meetRef.child(currentUser.id).set(currentUser);
            meetRef.child(currentUser.id).onDisconnect().remove();
            meetRef.get().then((result) => {
                updateParticipants(result.val())
            })
            meetRef.on("child_added", (_) => {
                addParticipant(_.val())
            })
            meetRef.on("child_removed", (_) => {
                removeParticipant(_.val())
            })
            meetRef.on("child_changed", (_) => {
                console.log("Something Changed!", _.val());
            })
        }
        return () => {
            const meetRef = database.ref().child(meetId)
            meetRef.child(currentUser.id).remove();
            meetRef.off()
            socket.off("newMessage");
            endCall()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (!isValidMeetId(meetId)) {
        pageRouter.replace("/");
    }

    const handleChangeCallOption = (option) => {
        setIsSidebarOpen(prev => {
            if (prev === option) return TABS.NO_SIDEBAR;
            return option;
        })
    }

    const handleCloseSidebar = () => {
        handleChangeCallOption(TABS.NO_SIDEBAR)
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
                <Sidebar isOpen={isSidebarOpen !== TABS.NO_SIDEBAR}>
                    {isSidebarOpen === TABS.INFO && <CallInfo onClose={handleCloseSidebar} />}
                    {isSidebarOpen === TABS.PEOPLE && <PeopleList onClose={handleCloseSidebar} />}
                    {isSidebarOpen === TABS.CHAT && <ChatList onClose={handleCloseSidebar} />}
                    {isSidebarOpen === TABS.ACTIVITIES && <CallActivities onClose={handleCloseSidebar} />}
                </Sidebar>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gray-900 flex flex-col space-y-2 md:flex-row items-center justify-between text-sm text-white px-3 pb-3">
                <div className="flex items-center">
                    <Time className="text-xs" />
                    <span className="mx-2 font-thin">|</span>
                    <CopyClipboard text={meetId} displayText={meetId} className="cursor-pointer" />
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
                        iconSet={(isSidebarOpen === TABS.INFO) ? "material-icons" : "google-material-icons"}
                        icon="info"
                        onClick={(_) => handleChangeCallOption(TABS.INFO)}
                    />
                    <div className="flex items-center justify-center relative">
                        <CallOptionButton
                            title="Participants"
                            icon="group"
                            iconSet={(isSidebarOpen === TABS.PEOPLE) ? "material-icons" : "google-material-icons"}
                            onClick={(_) => handleChangeCallOption(TABS.PEOPLE)} />
                        <div
                            style={{ fontSize: "0.6rem" }}
                            className="absolute -top-1 right-0 p-1 h-4 bg-red-700 text-xs text-white flex items-center justify-center rounded-full">
                            {participants.length + 1}
                        </div>
                    </div>
                    <CallOptionButton
                        title="Chat"
                        icon="chat"
                        iconSet={(isSidebarOpen === TABS.CHAT) ? "material-icons" : "google-material-icons"}
                        onClick={(_) => handleChangeCallOption(TABS.CHAT)} />
                    <CallOptionButton
                        title="Activities"
                        iconSet="google-material-icons"
                        icon="themes"
                        onClick={(_) => handleChangeCallOption(TABS.ACTIVITIES)}
                    />
                    <CallOptionButton
                        title="Host Controls"
                        iconSet={(isSidebarOpen === TABS.SECURITY) ? "material-icons" : "google-material-icons"}
                        icon="security"
                    />
                </div>
            </div>
        </main>
    );
}

const mapStateToProps = state => ({
    currentUser: state.auth,
    participants: state.call.participants.filter(e => e.id !== state.auth.id),
})

const mapDispatchToProps = dispatch => ({
    endCall: () => dispatch(resetCall()),
    addMessage: (e) => dispatch(addMessage(e)),
    updateParticipants: (e) => dispatch(updateParticipants(e)),
    addParticipant: (e) => dispatch(addParticipant(e)),
    removeParticipant: (e) => dispatch(removeParticipant(e)),
})



export default connect(mapStateToProps, mapDispatchToProps)(CallPage);
