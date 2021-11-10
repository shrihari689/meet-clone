import { Helmet } from "react-helmet";
import HomeCarousel from "../components/Home/HomeCarousel";
import NewMeetingButton from "../components/Home/NewMeetingButton";
import ExistingMeetingButton from "../components/Home/ExisitingMeetingButton";
import NavBar from "../components/Shared/NavBar";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home - Google Meet Clone | @shrihari689</title>
      </Helmet>
      <NavBar />
      <main className="mt-10 md:h-96 md:mt-24 flex items-center flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start px-5 md:px-10">
          <h1 className="text-xl md:text-3xl md:pr-20 font-normal select-none">
            Secure Video Call Conferencing for everyone
          </h1>
          <span className="text-xs md:text-sm text-gray-600 mt-2 md:pr-20 select-none">
            Connect, collaborate, and celebrate from anywhere with Google Meet
          </span>
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
};

export default HomePage;
