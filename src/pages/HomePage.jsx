import HomeCarousel from "../components/Home/HomeCarousel"
import NavBarAccount from "../components/Home/NavBarAccount";
import Date from "../components/Shared/Date";
import Time from "../components/Shared/Time"
import { Link } from "react-router-dom"
import meetLogo from "./../assets/meet_logo.png"
import { Helmet } from "react-helmet"
import NewMeetingButton from "../components/Home/NewMeetingButton";
import ExistingMeetingButton from "../components/Home/ExisitingMeetingButton";

const HomePage = () => {

    return (
        <>
            <Helmet>
                <title>Home - Google Meet Clone | @shrihari689</title>
            </Helmet>
            <nav className="flex items-center justify-between p-2 flex-wrap">
                <Link to="/home" className="flex items-center select-none">
                    <img src={meetLogo} alt="Meet Clone" />
                    <span className="text-lg ml-1 text-gray-700">Meet</span>
                </Link>
                <div className="flex items-center relative">
                    <div className="sm:flex items-center hidden">
                        <Time />
                        <span className="mx-1">•</span>
                        <Date />
                        <div className="h-10 w-10 ml-2 flex items-center justify-center hover:bg-gray-100 cursor-pointer rounded-full">
                            <i className="google-material-icons text-gray-700">help_outline</i>
                        </div>
                        <div className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 cursor-pointer rounded-full">
                            <i className="google-material-icons text-gray-700">feedback</i>
                        </div>
                        <div className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 cursor-pointer rounded-full">
                            <i className="google-material-icons text-gray-700">settings</i>
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
                    <h1 className="text-xl md:text-3xl md:pr-20 font-normal select-none">Secure Video Call Conferencing for everyone</h1>
                    <span className="text-xs md:text-sm text-gray-600 mt-2 md:pr-20 select-none">Connect, collaborate, and celebrate from anywhere with Google Meet</span>
                    <div className="flex items-center flex-wrap mt-5">
                        <NewMeetingButton />
                        <ExistingMeetingButton />
                    </div>
                </div>
                <div className="w-full md:w-1/2 pt-16 md:pt-8 px-2 select-none">
                    <HomeCarousel />
                </div>
            </main>
        </>
    );
}

export default HomePage;