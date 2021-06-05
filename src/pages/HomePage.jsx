import HomeCarousel from "../components/Home/HomeCarousel"
import NavBarAccount from "../components/Home/NavBarAccount";
import Date from "../components/Shared/Date";
import Time from "../components/Shared/Time"
import { Link, useHistory } from "react-router-dom"
import meetLogo from "./../assets/meet_logo.png"
import { generateNewMeetId, isValidMeetId } from "../utils/validator";
import { useState } from "react";

const HomePage = () => {

    const [meetingCode, setMeetingCode] = useState("");
    const pageRouter = useHistory();

    const handleNewMeeting = (newId = generateNewMeetId()) => {
        pageRouter.push(newId);
    }

    const handleNewMeetingByCode = (e) => {
        e.preventDefault();
        if (isValidMeetId(meetingCode)) {
            handleNewMeeting(meetingCode)
        }
    }

    return (
        <div>
            <nav className="flex items-center justify-between p-2 flex-wrap">
                <Link className="flex items-center select-none">
                    <img src={meetLogo} alt="Meet Clone" />
                    <span className="text-lg ml-1 text-gray-700">Meet</span>
                </Link>
                <div className="flex items-center relative">
                    <div className="sm:flex items-center hidden">
                        <Time />
                        <span className="mx-1">•</span>
                        <Date />
                        <div className="h-10 w-10 ml-2 flex items-center justify-center hover:bg-gray-100 cursor-pointer rounded-full">
                            <i className="google-material-icons text-gray-600">help_outline</i>
                        </div>
                        <div className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 cursor-pointer rounded-full">
                            <i className="google-material-icons text-gray-600">feedback</i>
                        </div>
                        <div className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 cursor-pointer rounded-full">
                            <i className="google-material-icons text-gray-600">settings</i>
                        </div>
                    </div>
                    <a target="_blank" rel="noreferrer" href="https://apps.google.com/" className="h-10 w-10 ml-5 flex items-center justify-center hover:bg-gray-100 cursor-pointer rounded-full">
                        <i className="google-material-icons text-gray-600">apps</i>
                    </a>
                    <NavBarAccount />
                </div>
            </nav>
            <main className="mt-10 md:h-96 md:mt-24 flex items-center flex-wrap">
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start px-5 md:px-10">
                    <h1 className="text-xl md:text-3xl md:pr-10 font-medium select-none">Secure Video Call Conferencing for everyone</h1>
                    <span className="text-xs md:text-sm text-gray-600 mt-2 md:pr-20 select-none">Connect, collaborate, and celebrate from anywhere with Google Meet</span>
                    <div className="flex items-center flex-wrap mt-5">
                        <div onClick={handleNewMeeting} className="flex items-center text-white cursor-pointer select-none mt-2 ml-2 bg-indigo-600 hover:bg-indigo-800 p-2 rounded-sm">
                            <i className="material-icons">video_call</i>
                            <span className="ml-2 text-sm">New Meeting</span>
                        </div>
                        <form onSubmit={handleNewMeetingByCode} className="flex items-center mt-2 rounded-sm ml-2 relative">
                            <input
                                value={meetingCode}
                                onChange={({ target: { value } }) => setMeetingCode(value)}
                                type="text"
                                className="border-2 border-gray-300 rounded-sm p-2 outline-none" placeholder="Enter a code" />
                            <button className="ml-2 text-gray-500 text-sm cursor-pointer select-none focus:outline-none">Join</button>
                            {meetingCode && !isValidMeetId(meetingCode) && <span className="absolute -bottom-6 text-xs text-red-700 font-semibold">Invalid Meeting Code</span>}
                        </form>
                    </div>
                </div>
                <div className="w-full md:w-1/2 pt-16 md:pt-8 px-2 select-none">
                    <HomeCarousel />
                </div>
            </main>
        </div>

    );
}

export default HomePage;