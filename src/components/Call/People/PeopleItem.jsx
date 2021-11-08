import MicAmplifyIcon from "../Icons/MicAmplifyIcon";

const PeopleItem = ({ people, onMute, onPin, isMute, isPinned }) => {
  const { user } = JSON.parse(people.customerDescription);

  const { name, image } = user;

  return (
    <div className="flex items-center justify-between my-2">
      <div className="flex items-center">
        <img
          referrerPolicy="no-referrer"
          className="rounded-full h-6 w-6 object-cover"
          src={image}
          alt={name}
        />
        <span className="text-xs font-normal ml-2">
          {name} {people.isLocal ? "(You)" : ""}
        </span>
      </div>
      <div className="flex items-center space-x-2 px-1 text-gray-600">
        <div
          onClick={onMute}
          className="h-8 w-8 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <MicAmplifyIcon isOn={isMute} iconStyle="text-gray-600" />
        </div>
        <div
          onClick={onPin}
          className={
            "h-8 w-8 cursor-pointer flex items-center justify-center rounded-full  " +
            (isPinned ? "bg-gray-300 hover:bg-gray-400" : "hover:bg-gray-100")
          }
        >
          <i className="google-material-icons" style={{ fontSize: "18px" }}>
            push_pin
          </i>
        </div>
      </div>
    </div>
  );
};

export default PeopleItem;
