import { useHistory } from "react-router-dom";

const EndCallButton = () => {

    const pageRouter = useHistory();

    const handleEndCall = (_) => {
        pageRouter.replace("home")
    }

    return (
        <div
            title="End Call"
            onClick={handleEndCall}
            className="h-8 w-14 rounded-full cursor-pointer flex items-center justify-center mx-1 bg-red-700 hover:bg-red-900">
            <i className="google-material-icons" style={{ fontSize: '16px' }}>
                call_end
            </i>
        </div>
    );
}

export default EndCallButton;