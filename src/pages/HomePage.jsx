import HomeCarousel from "../components/Home/HomeCarousel"
import NavBarAccount from "../components/Home/NavBarAccount";

const HomePage = () => {
    return (
        <div>
            <nav className="flex items-center justify-between p-2 flex-wrap">
                <div className="flex items-center">
                    <img src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png" alt="Meet Clone" />
                    <span className="text-lg ml-1 text-gray-700">Meet</span>
                </div>
                <div className="flex items-center relative">
                    <div className="sm:flex items-center hidden">
                        <span>1:18 PM</span>
                        <span className="mx-1">•</span>
                        <span>Sat, June 5</span>
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
                    <a target="_blank" href="https://apps.google.com/" className="h-10 w-10 ml-5 flex items-center justify-center hover:bg-gray-100 cursor-pointer rounded-full">
                        <i className="google-material-icons text-gray-600">apps</i>
                    </a>
                    <NavBarAccount />
                </div>
            </nav>
            <main className="mt-10 md:h-96 md:mt-24 flex items-center flex-wrap">
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start px-5 md:px-10">
                    <h1 className="text-xl md:text-3xl md:pr-10 font-medium">Secure Video Call Conferencing for everyone</h1>
                    <span className="text-xs md:text-sm text-gray-600 mt-2 md:pr-20">Connect, collaborate, and celebrate from anywhere with Google Meet</span>
                    <div className="flex items-center flex-wrap mt-5">
                        <div className="flex items-center text-white cursor-pointer mt-2 ml-2 bg-indigo-600 p-2 rounded-sm">
                            <i className="material-icons">video_call</i>
                            <span className="ml-2 text-sm">New Meeting</span>
                        </div>
                        <div className="flex items-center mt-2 rounded-sm ml-2">
                            <input type="text" className="border-2 border-gray-300 rounded-sm p-2 outline-none" placeholder="Enter a code" />
                            <span className="ml-2 text-gray-500 text-sm cursor-pointer">Join</span>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 pt-8 px-2">
                    <HomeCarousel />
                </div>
            </main>
        </div>

    );
}

export default HomePage;