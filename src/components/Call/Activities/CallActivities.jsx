import SidebarHeader from "../Shared/SidebarHeader"
import callRecordIcon from "./../../../assets/call_record.svg";
import callWhiteboardIcon from "./../../../assets/call_whiteboard.svg";

const ACTIVITIES = [
    { title: "Recording", description: "Record meetings for on-demand viewing", image: callRecordIcon },
    { title: "Whiteboarding", description: "Collaborating brainstrom and sketch ideas", image: callWhiteboardIcon }
]

const CallActivities = ({ onClose }) => {
    return (
        <>
            <SidebarHeader title="Activities" onClose={onClose} />
            <div className="flex flex-col flex-1 items-center w-full">
                {
                    ACTIVITIES.map(({ title, description, image }, id) =>
                        <div key={id} className="flex items-center cursor-pointer w-full px-3 py-2 my-1 hover:bg-gray-100">
                            <img className="w-10 h-10 rounded-full" src={image} alt={title} />
                            <div className="ml-3 flex flex-col">
                                <span className="text-sm font-semibold mb-1">{title}</span>
                                <span className="text-xs text-gray-500">{description}</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default CallActivities;