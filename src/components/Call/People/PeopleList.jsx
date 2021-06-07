import { connect } from "react-redux";
import SidebarHeader from "../Shared/SidebarHeader";
import PeopleItem from "./PeopleItem";

const PeopleList = ({ onClose, currentUser, participants }) => {
    return (
        <>
            <SidebarHeader title="People" onClose={onClose} />
            <div className="flex flex-col flex-1 overflow-y-auto items-center w-full">
                <div className="grid grid-cols-3 w-full px-2">
                    <div className="flex flex-col space-y-1 items-center cursor-pointer rounded-md px-2 py-3 select-none text-gray-700 hover:bg-gray-100">
                        <i className="google-material-icons" style={{ fontSize: '18px' }}>mic_off</i>
                        <span className="text-xs text-center">All muted</span>
                    </div>
                    <div className="flex flex-col space-y-1 items-center cursor-pointer rounded-md px-2 py-3 select-none text-gray-700 hover:bg-gray-100">
                        <i className="google-material-icons" style={{ fontSize: '18px' }}>person_add</i>
                        <span className="text-xs text-center">Add People</span>
                    </div>
                    <div className="flex flex-col space-y-1 items-center cursor-pointer rounded-md px-2 py-3 select-none text-gray-700 hover:bg-gray-100">
                        <i className="google-material-icons" style={{ fontSize: '18px' }}>toggle_on</i>
                        <span className="text-xs text-center">Host Control</span>
                    </div>
                </div>
                <section className="w-full px-3 pl-4 flex-1">
                    <h2 className="font-semibold my-2 text-gray-600" style={{ fontSize: "0.7rem" }}>IN CALL</h2>
                    <div className="flex flex-col">
                        < PeopleItem
                            key={-1}
                            details={{ ...currentUser, name: currentUser.name + " (You)" }}
                            onMute={(_) => { }}
                            onPin={(_) => { }}
                        />
                        {
                            participants
                                .sort((a, b) => a.name < b.name ? -1 : 1)
                                .map((people, i) =>
                                    < PeopleItem
                                        key={i}
                                        details={people}
                                        onMute={(_) => { }}
                                        onPin={(_) => { }}
                                    />
                                )
                        }
                    </div>
                </section>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    currentUser: state.auth,
    participants: state.call.participants.filter(e => e.id !== state.auth.id),
})

export default connect(mapStateToProps)(PeopleList);