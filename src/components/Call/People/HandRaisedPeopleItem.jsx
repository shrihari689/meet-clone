import { connect } from "react-redux";
import { updateParticipantDetails } from "../../../database/fires";

const HandRaisedPeopleItem = ({
    details: { name, image, refId, isHandRaised: isOn },
    isHost,
    meetId
}) => {

    const handleLowerHand = (_) => {
        const isHandRaised = !isOn;
        updateParticipantDetails(meetId, refId, { isHandRaised })
    }

    return (
        <div className="flex items-center justify-between my-2">
            <div className="flex items-center">
                <img className="rounded-full h-6 w-6 object-cover" src={image} alt={name} />
                <span className="text-xs font-normal ml-2">{name}</span>
            </div>
            <div className="flex items-center space-x-2 px-1 ">
                {
                    isHost ?
                        <span onClick={handleLowerHand} className="text-xs cursor-pointer text-gray-500 hover:text-gray-900 font-medium">Lower</span>
                        : <i className="material-icons text-sm text-indigo-600">pan_tool</i>
                }
            </div>
        </div>
    );
}

const mapStateToProps = ({ call }) => ({
    isHost: call.isHost,
    meetId: call.meetId
})

export default connect(mapStateToProps)(HandRaisedPeopleItem);