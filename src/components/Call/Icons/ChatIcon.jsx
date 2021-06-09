import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../../../database/call';
import { TABS } from '../../../database/entities';
import socket from '../../../utils/socket';
import { isValidMeetId } from '../../../utils/validator';

const ChatIcon = ({
    meetId,
    isSidebarOpen,
    hasUnseenMessages,
    setIsSidebarOpen,
    addMessage
}) => {

    useEffect(() => {
        if (isValidMeetId(meetId)) {
            socket.emit("joinCall", JSON.stringify({ meetId }))
            socket.off("newMessage");
            socket.on("newMessage", (data) => {
                const payload = JSON.parse(data)
                addMessage(payload)
            })
        }
    }, [meetId]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeCallOption = () => {
        setIsSidebarOpen(TABS.CHAT)
    }

    return (
        <div className="flex items-center justify-center relative">
            <div title="Chat"
                onClick={handleChangeCallOption}
                className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-800">
                <i className={(isSidebarOpen === TABS.CHAT) ? "material-icons" : "google-material-icons"} style={{ fontSize: '18px' }}>chat</i>
            </div>
            {
                hasUnseenMessages &&
                <span className="absolute top-0 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
            }
        </div >

    );
}

const mapStateToProps = state => ({
    meetId: state.call.meetId,
    hasUnseenMessages: state.call.hasUnseenMessages,
})

const mapDispatchToProps = dispatch => ({
    addMessage: e => dispatch(addMessage(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatIcon);