import { connect } from "react-redux";
import SidebarHeader from "../Shared/SidebarHeader";
import HandRaisedPeopleItem from "./HandRaisedPeopleItem";
import PeopleItem from "./PeopleItem";

function PeopleList({ onClose, participants, handRaised }) {
  const peoples = participants;
  const handRaisedPeoples = peoples.filter((people) => handRaised[people.id]);

  return (
    <>
      <SidebarHeader title="People" onClose={onClose} />
      <div className="flex flex-col flex-1 overflow-y-auto items-center w-full">
        <div className="grid grid-cols-3 w-full px-2">
          <div className="flex flex-col space-y-1 items-center cursor-pointer rounded-md px-2 py-3 select-none text-gray-700 hover:bg-gray-100">
            <i className="google-material-icons" style={{ fontSize: "18px" }}>
              mic_off
            </i>
            <span className="text-xs text-center">All muted</span>
          </div>
          <div className="flex flex-col space-y-1 items-center cursor-pointer rounded-md px-2 py-3 select-none text-gray-700 hover:bg-gray-100">
            <i className="google-material-icons" style={{ fontSize: "18px" }}>
              person_add
            </i>
            <span className="text-xs text-center">Add People</span>
          </div>
          <div className="flex flex-col space-y-1 items-center cursor-pointer rounded-md px-2 py-3 select-none text-gray-700 hover:bg-gray-100">
            <i className="google-material-icons" style={{ fontSize: "18px" }}>
              toggle_on
            </i>
            <span className="text-xs text-center">Host Control</span>
          </div>
        </div>
        {handRaisedPeoples.length > 0 && (
          <section className="w-full px-3 pl-4">
            <h2
              className="font-semibold my-2 text-gray-600"
              style={{ fontSize: "0.7rem" }}
            >
              RAISED HAND
            </h2>
            <div className="flex flex-col">
              {handRaisedPeoples.map((people, i) => (
                <HandRaisedPeopleItem key={i} details={people} />
              ))}
            </div>
          </section>
        )}
        <section className="w-full px-3 pl-4 flex-1">
          <h2
            className="font-semibold my-2 text-gray-600"
            style={{ fontSize: "0.7rem" }}
          >
            IN CALL
          </h2>
          <div className="flex flex-col">
            {peoples.map((people) => (
              <PeopleItem
                key={people.id}
                people={people}
                onMute={(_) => {}}
                onPin={(_) => {}}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  participants: Object.keys(state.call.peers).map((e) => state.call.peers[e]),
  handRaised: state.call.handRaised,
});

export default connect(mapStateToProps)(PeopleList);
