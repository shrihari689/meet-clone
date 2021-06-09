import { useEffect } from "react";
import { connect } from "react-redux";
import { toggleMic } from "../../../database/call";
import { database } from "../../../utils/firebase";

const MicButton = ({ isOn, setIsOn, meetId, refId }) => {

    useEffect(() => {
        if (meetId && refId)
            database.ref().child(meetId).child(refId).update({
                isMicOn: isOn
            })
    }, [isOn])  // eslint-disable-line react-hooks/exhaustive-deps



    const toggleMic = (_) => {
        setIsOn()
    }

    return (
        <div
            title={"Audio " + (isOn ? "Off" : "On")}
            onClick={toggleMic}
            className={"h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " + (!isOn ? " bg-red-700 hover:bg-red-900" : " bg-gray-700 hover:bg-gray-800")}>
            <i className="google-material-icons" style={{ fontSize: '16px' }}>
                {isOn ? "mic" : "mic_off"}
            </i>
        </div>
    );
}

const mapStateToProps = state => ({
    isOn: state.call.isMicOn,
    refId: state.call.refId,
    meetId: state.call.meetId
})

const mapDispatchToProps = dispatch => ({
    setIsOn: _ => dispatch(toggleMic())
})

export default connect(mapStateToProps, mapDispatchToProps)(MicButton);