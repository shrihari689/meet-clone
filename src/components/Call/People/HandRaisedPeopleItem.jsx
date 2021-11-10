import { connect } from "react-redux";
import { lowerHand } from "../../../database/call";
import { hmsActions } from "./../../../utils/hms";

const HandRaisedPeopleItem = ({ people, isHost, lowerHandById }) => {
  const { user } = JSON.parse(people.customerDescription);

  const { name, image } = user;

  const handleLowerHand = (_) => {
    hmsActions.sendBroadcastMessage(people.id, "HAND_LOWERED");
    lowerHandById(people.id);
  };

  return (
    <div className="group flex items-center justify-between my-2">
      <div className="flex items-center">
        <img
          className="rounded-full h-6 w-6 object-cover"
          src={image}
          alt={name}
        />
        <span className="text-xs font-normal ml-2">{name}</span>
      </div>
      <div className="flex items-center space-x-2 px-1 ">
        {isHost ? (
          <>
            <span
              onClick={handleLowerHand}
              className="group-hover:block hidden text-xs cursor-pointer text-gray-500 hover:text-gray-900 font-medium"
            >
              Lower
            </span>
            <i className="group-hover:hidden material-icons text-sm text-indigo-600">
              pan_tool
            </i>
          </>
        ) : (
          <i className="material-icons text-sm text-indigo-600">pan_tool</i>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = () => ({
  isHost: true,
});

const mapDispatchToProps = (dispatch) => ({
  lowerHandById: (e) => dispatch(lowerHand(e)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HandRaisedPeopleItem);
