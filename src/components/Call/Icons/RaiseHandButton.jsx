import { connect } from "react-redux";
import { updateParticipantDetails } from "../../../database/fires";

const RaiseHandButton = ({ isOn, meetId, refId }) => {

    const toggleHand = (_) => {
        updateParticipantDetails(meetId, refId, { isHandRaised: !isOn })
    }

    return (
        <div
            title={(isOn ? "Lower Hands" : "Raise Hands")}
            onClick={toggleHand}
            className={"h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " + (isOn ? " bg-yellow-600 hover:bg-yellow-500" : " bg-gray-700 hover:bg-gray-800")}>
            <i className="google-material-icons" style={{ fontSize: '16px' }}>
                pan_tool
            </i>
        </div>
    );
}

const mapStateToProps = ({ call }) => ({
    meetId: call.meetId,
    refId: call.refId,
    isOn: !!call.participants.find(e => e.refId === call.refId)?.isHandRaised
})

export default connect(mapStateToProps)(RaiseHandButton);