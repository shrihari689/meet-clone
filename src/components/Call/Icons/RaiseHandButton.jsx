import { connect } from "react-redux";
import { lowerHand, raiseHand } from "../../../database/call";
import { hmsActions } from "../../../utils/hms";

const RaiseHandButton = ({ isOn, room, raiseHandById, lowerHandById }) => {
  const toggleHand = (_) => {
    if (isOn) {
      hmsActions.sendBroadcastMessage(room.localPeer, "HAND_LOWERED");
      lowerHandById(room.localPeer);
    } else {
      hmsActions.sendBroadcastMessage(room.localPeer, "HAND_RAISED");
      raiseHandById(room.localPeer);
    }
  };

  return (
    <div
      title={isOn ? "Lower Hands" : "Raise Hands"}
      onClick={toggleHand}
      className={
        "h-8 w-8 rounded-full cursor-pointer flex items-center justify-center mx-1 " +
        (isOn
          ? " bg-yellow-600 hover:bg-yellow-500"
          : " bg-gray-700 hover:bg-gray-800")
      }
    >
      <i className="google-material-icons" style={{ fontSize: "16px" }}>
        pan_tool
      </i>
    </div>
  );
};

const mapStateToProps = ({ call }) => ({
  isOn: call.handRaised[call.room.localPeer],
  room: call.room,
});

const mapDispatchToProps = (dispatch) => ({
  raiseHandById: (e) => dispatch(raiseHand(e)),
  lowerHandById: (e) => dispatch(lowerHand(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RaiseHandButton);
