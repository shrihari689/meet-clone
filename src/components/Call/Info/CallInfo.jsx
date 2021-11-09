import SidebarHeader from "../Shared/SidebarHeader";
import CopyClipboard from "./../../Shared/CopyClipboard";

const CallInfo = ({ onClose }) => {
  const generateRandomPhoneNumber = () => {
    const pattern = [
      ["*", "*", "*", "*"],
      ["*", "*", "*", "*", "*"],
    ];
    return pattern
      .map((e) => e.map((_) => Math.floor(Math.random() * 9)).join(""))
      .join(" ");
  };

  const details = {
    url: window?.location?.href,
    dialIn: "(IN) +91 9" + generateRandomPhoneNumber(),
    pin: `${Math.floor(Math.random() * 999)} ${Math.floor(
      Math.random() * 999
    )} ${Math.floor(Math.random() * 999)}#`,
  };

  return (
    <>
      <SidebarHeader title="Meeting details" onClose={onClose} />
      <section className="w-full p-3 pl-5 text-sm">
        <h2 className="font-semibold my-1 text-xs text-gray-800">
          Joining info
        </h2>
        <div>{details.url}</div>
        <div>
          <span className="text-xs font-semibold">Dial-in:</span>{" "}
          {details.dialIn}
        </div>
        <div>
          <span className="text-xs font-semibold">PIN:</span> {details.pin}
        </div>
      </section>
      <CopyClipboard
        text={details.url}
        displayText="📄 Copy joining info"
        position="-bottom-8 left-16"
        className="cursor-pointer bg-gray-100 text-indigo-800 rounded-md hover:bg-gray-200 px-5 py-2"
      />
      <div className="flex-1 border-t-2 mt-10 border-gray-300 w-11/12"></div>
    </>
  );
};

export default CallInfo;
