import { useEffect } from "react";
import { connect } from "react-redux";
import { toggleVideo } from "../../../database/call";
import { database } from "../../../utils/firebase";

const VideoButton = ({ isOn, setIsOn, meetId, refId }) => {

    useEffect(() => {
        if (meetId && refId)
            database.ref().child(meetId).child(refId).update({
                isCamOn: isOn
            })
    }, [isOn]) // eslint-disable-line react-hooks/exhaustive-deps

    const toggleCam = (_) => {
        setIsOn()
    }

    return (
        <div
            title={"Video " + (isOn ? "Off" : "On")}
            onClick={toggleCam}
            className={"h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " + (!isOn ? " bg-red-700 hover:bg-red-900" : " bg-gray-700 hover:bg-gray-800")}>
            <i className="google-material-icons" style={{ fontSize: '16px' }}>
                {!isOn ? "videocam_off" : "videocam"}
            </i>
        </div>
    );
}

const mapStateToProps = state => ({
    isOn: state.call.isCamOn,
    refId: state.call.refId,
    meetId: state.call.meetId
})

const mapDispatchToProps = dispatch => ({
    setIsOn: _ => dispatch(toggleVideo())
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoButton);