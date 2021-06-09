import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase, { database } from "../../utils/firebase";
import { generateNewMeetId } from "../../utils/validator";

const NewMeetingButton = ({ currentUser }) => {

    const [isLoading, setIsLoading] = useState(false);
    const pageRouter = useHistory();

    const handleNewMeeting = (_) => {
        setIsLoading(true);
        const newId = generateNewMeetId()
        database.ref().child("Meetings").child(newId).onDisconnect().update({
            adminDisconnected: true
        })
        database.ref().child("Meetings").child(newId).set({
            meetId: newId,
            meetHost: currentUser.id,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        }).then(_ => {
            setIsLoading(false);
            pageRouter.push(newId);
        }).catch(_ => {
            setIsLoading(false);
        })
    }

    return (
        <button
            disabled={isLoading}
            onClick={handleNewMeeting}
            className={"flex items-center text-white cursor-pointer select-none mt-2 ml-2 p-2 rounded-sm " + (isLoading ? "cursor-not-allowed bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-800")}>
            {
                isLoading ?
                    <i className="material-icons animate-spin">sync</i>
                    : <i className="material-icons">video_call</i>
            }
            <span className="ml-2 text-sm">New Meeting</span>
        </button>
    );
}


const mapStateToProps = state => ({
    currentUser: state.auth
})

export default connect(mapStateToProps)(NewMeetingButton);