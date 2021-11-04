import { useState } from "react";
import { hmsActions } from "../../../utils/hms";

const EndCallButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleEndCall = (_) => {
    setIsLoading(true);
    hmsActions.leave();
  };

  return (
    <div
      title="End Call"
      onClick={handleEndCall}
      className="h-8 w-14 rounded-full cursor-pointer flex items-center justify-center mx-1 bg-red-700 hover:bg-red-900"
    >
      {isLoading ? (
        <i className="google-material-icons animate-spin">loop</i>
      ) : (
        <i className="google-material-icons" style={{ fontSize: "16px" }}>
          call_end
        </i>
      )}
    </div>
  );
};

export default EndCallButton;
