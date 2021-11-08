import React, { useEffect } from "react";
import CallOptionButton from "./../components/Call/CallOptionButton";
import Time from "./../components/Shared/Time";
import PeopleList from "./../components/Call/People/PeopleList";
import ChatList from "./../components/Call/Chat/ChatList";
import Sidebar from "./../components/Call/Shared/Sidebar";
import CopyClipboard from "./../components/Shared/CopyClipboard";
import CallInfo from "./../components/Call/Info/CallInfo";
import CallActivities from "./../components/Call/Activities/CallActivities";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import MicButton from "../components/Call/Icons/MicButton";
import VideoButton from "../components/Call/Icons/VideoButton";
import ShareScreenButton from "../components/Call/Icons/ShareScreenButton";
import MoreButton from "../components/Call/Icons/MoreButton";
import EndCallButton from "../components/Call/Icons/EndCallButton";
import CallPeopleItem from "../components/Call/CallPeopleItem";
import {
  playIncomingMessageSound,
  playJoiningSound,
  playLeavingSound,
} from "../utils/sounds";
import { TABS } from "../database/entities";
import ChatIcon from "../components/Call/Icons/ChatIcon";
import HostControlsIcon from "../components/Call/Icons/HostControlsIcon";
import { lowerHand, raiseHand, setIsSidebarOpen } from "../database/call";
import { Redirect } from "react-router";
import { hmsNotifications } from "../utils/hms";
import { HMSNotificationTypes } from "@100mslive/hms-video-store";
import RaiseHandButton from "../components/Call/Icons/RaiseHandButton";

const CallPage = ({
  match,
  isSidebarOpen,
  setIsSidebarOpen,
  callInfo,
  raiseHandById,
  lowerHandById,
}) => {
  const meetId = match.params.id;

  useEffect(() => {
    playJoiningSound();
    const unsubscribe = hmsNotifications.onNotification((notification) => {
      if (notification.type === HMSNotificationTypes.NEW_MESSAGE) {
        if (notification.data?.type === "HAND_RAISED")
          raiseHandById(notification.data.message);
        else if (notification.data?.type === "HAND_LOWERED")
          lowerHandById(notification.data.message);
        playIncomingMessageSound();
      }
    });
    return () => {
      unsubscribe();
      playLeavingSound();
    };
  }, [raiseHandById, lowerHandById]);

  const { room, peers, tracks, pinnedParticipant } = callInfo;
  const peoples = Object.keys(peers).map((e) => peers[e]);

  const handleSidebarChange = (option) => {
    setIsSidebarOpen(option);
  };

  const handleCloseSidebar = () => {
    handleSidebarChange(TABS.NO_SIDEBAR);
  };

  if (!room.isConnected) return <Redirect to="/home" />;

  return (
    <main className="h-screen w-full flex flex-col justify-between bg-gray-900 overflow-hidden">
      <Helmet>
        <title>{meetId} - Google Meet Clone | @shrihari689</title>
      </Helmet>
      <div className="w-full h-screen flex p-3 pb-28 md:pb-14">
        <div className="flex-1 w-full px-2 flex flex-wrap">
          {pinnedParticipant && peers[pinnedParticipant] ? (
            <CallPeopleItem
              key={peers[pinnedParticipant].id}
              audio={tracks[peers[pinnedParticipant].audioTrack]}
              video={tracks[peers[pinnedParticipant].videoTrack]}
              people={peers[pinnedParticipant]}
            />
          ) : (
            peoples.map((peer) => (
              <CallPeopleItem
                key={peer.id}
                audio={tracks[peer.audioTrack]}
                video={tracks[peer.videoTrack]}
                people={peer}
              />
            ))
          )}
        </div>
        <Sidebar isOpen={isSidebarOpen !== TABS.NO_SIDEBAR}>
          {isSidebarOpen === TABS.INFO && (
            <CallInfo onClose={handleCloseSidebar} />
          )}
          {isSidebarOpen === TABS.PEOPLE && (
            <PeopleList onClose={handleCloseSidebar} />
          )}
          {isSidebarOpen === TABS.CHAT && (
            <ChatList onClose={handleCloseSidebar} />
          )}
          {isSidebarOpen === TABS.ACTIVITIES && (
            <CallActivities onClose={handleCloseSidebar} />
          )}
        </Sidebar>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-gray-900 flex flex-col space-y-2 md:flex-row items-center justify-between text-sm text-white px-3 pb-3">
        <div className="flex items-center">
          <Time className="text-xs" />
          <span className="mx-2 font-thin">|</span>
          <CopyClipboard
            text={meetId}
            displayText={meetId}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center">
          <MicButton
            localPeerAudio={tracks[peers[room.localPeer].audioTrack]}
          />
          <VideoButton
            localPeerVideo={tracks[peers[room.localPeer].videoTrack]}
          />
          {/* <CaptionsButton /> */}
          <RaiseHandButton />
          <ShareScreenButton />
          <MoreButton />
          <EndCallButton />
        </div>
        <div className="flex items-center">
          <CallOptionButton
            title="Info"
            iconSet={
              isSidebarOpen === TABS.INFO
                ? "material-icons"
                : "google-material-icons"
            }
            icon="info"
            onClick={(_) => handleSidebarChange(TABS.INFO)}
          />
          <div className="flex items-center justify-center relative">
            <CallOptionButton
              title="Participants"
              icon="group"
              iconSet={
                isSidebarOpen === TABS.PEOPLE
                  ? "material-icons"
                  : "google-material-icons"
              }
              onClick={(_) => handleSidebarChange(TABS.PEOPLE)}
            />
            <div
              style={{ fontSize: "0.6rem" }}
              className="absolute -top-1 right-0 p-1 h-4 bg-red-700 text-xs text-white flex items-center justify-center rounded-full"
            >
              {peoples.length}
            </div>
          </div>
          <ChatIcon
            isSidebarOpen={isSidebarOpen}
            onClick={(_) => handleSidebarChange(TABS.CHAT)}
          />
          <CallOptionButton
            title="Activities"
            iconSet="google-material-icons"
            icon="themes"
            onClick={(_) => handleSidebarChange(TABS.ACTIVITIES)}
          />
          <HostControlsIcon
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  callInfo: state.call,
  hasUnseenMessages: state.call.hasUnseenMessages,
  isSidebarOpen: state.call.isSidebarOpen,
});

const mapDispatchToProps = (dispatch) => ({
  setIsSidebarOpen: (e) => dispatch(setIsSidebarOpen(e)),
  raiseHandById: (e) => dispatch(raiseHand(e)),
  lowerHandById: (e) => dispatch(lowerHand(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CallPage);
