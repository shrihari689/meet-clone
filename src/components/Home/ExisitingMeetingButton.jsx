import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getMeetDetails } from "./../../database/fires";

const ERRORS = {
  NO_ERROR: "",
  INVALID_CODE: "Invalid Meeting Code",
  NETWORK_ERROR: "Network Error!",
  CODE_NOT_EXIST: "Meeting code does not exist",
  MAX_ATTEMPTS: "Maximum Attempts Reached!",
  ENTER_CODE: "Enter a Code",
};

const MAX_ATTEMPTS = 10;

const ExistingMeetingButton = () => {
  const [meetingCode, setMeetingCode] = useState("");
  const [error, setError] = useState(ERRORS.NO_ERROR);
  const [isLoading, setIsLoading] = useState(false);
  const pageRouter = useHistory();
  const [attempts, setAttempts] = useState(0);

  const handleNewMeetingByCode = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (attempts > MAX_ATTEMPTS) {
      setIsLoading(false);
      setError(ERRORS.MAX_ATTEMPTS);
    } else if (!meetingCode) {
      setIsLoading(false);
      setError(ERRORS.ENTER_CODE);
    } else if (!/[a-z]{3}-[a-z]{4}-[a-z]{3}/.test(meetingCode)) {
      setIsLoading(false);
      setError(ERRORS.ENTER_CODE);
    } else {
      getMeetDetails(meetingCode)
        .then((result) => {
          if (result.exists()) {
            pageRouter.push("/join/" + meetingCode);
          } else {
            setIsLoading(false);
            setAttempts((prev) => prev + 1);
            setError(ERRORS.CODE_NOT_EXIST);
          }
        })
        .catch((_) => {
          setIsLoading(false);
          setAttempts((prev) => prev + 1);
          setError(ERRORS.NETWORK_ERROR);
        });
    }
  };

  const handleMeetCodeChange = ({ target: { value } }) => {
    const newId = value.trim().toLowerCase();
    setMeetingCode(newId);
    if (!newId) return setError(ERRORS.NO_ERROR);
    else if (!/[a-z]{3}-[a-z]{4}-[a-z]{3}/.test(newId))
      return setError(ERRORS.INVALID_CODE);
    else return setError(ERRORS.NO_ERROR);
  };

  return (
    <form
      onSubmit={handleNewMeetingByCode}
      className="flex items-center mt-2 rounded-sm ml-2 relative"
    >
      <input
        value={meetingCode}
        onChange={handleMeetCodeChange}
        type="text"
        className={
          "border-2 border-gray-300 rounded-sm p-2 outline-none " +
          (error && "focus:ring-2 ring-red-700")
        }
        placeholder="Enter a code"
      />
      <button className="ml-2 text-gray-500 text-sm cursor-pointer select-none focus:outline-none ">
        {isLoading ? (
          <i className="material-icons animate-spin">sync</i>
        ) : (
          "Join"
        )}
      </button>
      {error && (
        <span className="absolute -bottom-6 text-xs text-red-700 font-semibold">
          {error}
        </span>
      )}
    </form>
  );
};

export default ExistingMeetingButton;
