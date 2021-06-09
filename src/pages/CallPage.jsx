import React, { useEffect } from 'react';
import CallOptionButton from './../components/Call/CallOptionButton';
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
import { resetCall, updateParticipants, addParticipant, removeParticipant, setCallInfo, updateParticipant, setIsSidebarOpen } from '../database/call';
import socket from "./../utils/socket"
import { database } from "./../utils/firebase"
import { getOrderedPeoples } from '../utils/general';
import MicButton from '../components/Call/Icons/MicButton';
import VideoButton from '../components/Call/Icons/VideoButton';
import CaptionsButton from '../components/Call/Icons/CaptionsButton';
import RaiseHandButton from '../components/Call/Icons/RaiseHandButton';
import ShareScreenButton from '../components/Call/Icons/ShareScreenButton';
import MoreButton from '../components/Call/Icons/MoreButton';
import EndCallButton from '../components/Call/Icons/EndCallButton';
import CallPeopleItem from '../components/Call/CallPeopleItem';
import { playJoiningSound, playLeavingSound } from '../utils/sounds';
import { TABS } from '../database/entities';
import ChatIcon from '../components/Call/Icons/ChatIcon';

const CallPage = ({
    match,
    refId,
    participants,
    endCall,
    currentUser,
    updateParticipant,
    updateParticipants,
    addParticipant,
    setCallInfo,
    removeParticipant,
    hasUnseenMessages,
    isSidebarOpen,
    setIsSidebarOpen
}) => {

    const pageRouter = useHistory();
    const { params: { id: meetId } } = match;

    if (!isValidMeetId(meetId)) {
        pageRouter.replace("/");
    }

    useEffect(() => {
        let refId = "";
        if (isValidMeetId(meetId)) {
            const meetRef = database.ref().child(meetId)
            refId = meetRef.push().key;
            meetRef.child(refId).set({
                ...currentUser,
                isMicOn: false,
                isCamOn: false,
                refId,
            });
            meetRef.child(refId).onDisconnect().remove();
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
                updateParticipant(_.val());
            })
            setCallInfo({
                refId,
                meetId
            });
            playJoiningSound();
        }
        return () => {
            if (isValidMeetId(meetId)) {
                const meetRef = database.ref().child(meetId)
                meetRef.child(refId)?.remove();
                meetRef.off()
                socket.off("newMessage");
                endCall()
                playLeavingSound()
            }
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const orderedPeoples = getOrderedPeoples(participants, refId)

    const handleChangeCallOption = (option) => {
        setIsSidebarOpen(option)
    }

    const handleCloseSidebar = () => {
        handleChangeCallOption(TABS.NO_SIDEBAR)
    }

    return (
        <main className="h-screen w-full flex flex-col justify-between bg-gray-900 overflow-hidden">
            <Helmet>
                <title>{meetId} - Google Meet Clone | @shrihari689</title>
            </Helmet>
            <div className="w-full h-screen flex p-3 pb-28 md:pb-14">
                <div className="flex-1 w-full px-2 flex flex-wrap">
                    {
                        orderedPeoples.map((e) =>
                            <CallPeopleItem key={e.refId} {...e} currentRefId={refId} />
                        )
                    }
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
                    <MicButton />
                    <VideoButton />
                    <CaptionsButton />
                    <RaiseHandButton />
                    <ShareScreenButton />
                    <MoreButton />
                    <EndCallButton />
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
                            {orderedPeoples.length}
                        </div>
                    </div>
                    <ChatIcon
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
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
    refId: state.call.refId,
    hasUnseenMessages: state.call.hasUnseenMessages,
    participants: state.call.participants,
    isSidebarOpen: state.call.isSidebarOpen
})

const mapDispatchToProps = dispatch => ({
    setCallInfo: e => dispatch(setCallInfo(e)),
    endCall: () => dispatch(resetCall()),
    updateParticipant: (e) => dispatch(updateParticipant(e)),
    updateParticipants: (e) => dispatch(updateParticipants(e)),
    addParticipant: (e) => dispatch(addParticipant(e)),
    removeParticipant: (e) => dispatch(removeParticipant(e)),
    setIsSidebarOpen: e => dispatch(setIsSidebarOpen(e)),
})



export default connect(mapStateToProps, mapDispatchToProps)(CallPage);
