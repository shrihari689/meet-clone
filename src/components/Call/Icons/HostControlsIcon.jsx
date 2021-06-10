import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setHostInfo } from '../../../database/call';
import { TABS } from '../../../database/entities';
import { createNewMeeting, getMeetDetails } from '../../../database/fires';
import { isValidMeetId } from '../../../utils/validator';

const HostControlsIcon = ({
    meetId,
    userId,
    isHost,
    setHostInfo,
    setIsSidebarOpen,
}) => {

    useEffect(() => {
        if (isValidMeetId(meetId)) {
            getMeetDetails(meetId).then(result => {
                if (result.exists()) {
                    const data = result.val();
                    setHostInfo({
                        isHost: userId === data.meetHost,
                        hostId: data.meetHost,
                        isChatDisabled: data.isChatDisabled
                    });
                }
                else {
                    createNewMeeting(meetId, userId);
                    setHostInfo({
                        isHost: true,
                        hostId: userId,
                        isChatDisabled: false
                    })
                }
            })
        }
    }, [meetId]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeCallOption = () => {
        setIsSidebarOpen(TABS.SECURITY)
    }

    if (!isHost)
        return <></>

    return (
        <div
            title="Host Controls"
            onClick={handleChangeCallOption}
            className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-800"
        >
            <i className="google-material-icons" style={{ fontSize: '18px' }}>security</i>
        </div>

    );
}

const mapStateToProps = state => ({
    meetId: state.call.meetId,
    isHost: state.call.isHost,
    userId: state.auth.id
})

const mapDispatchToProps = dispatch => ({
    setHostInfo: e => dispatch(setHostInfo(e))
})

export default connect(mapStateToProps, mapDispatchToProps)(HostControlsIcon);