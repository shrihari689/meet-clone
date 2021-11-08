import { Helmet } from "react-helmet";
import NavBar from "../components/Shared/NavBar";

const PreviewPage = () => {
  return (
    <>
      <Helmet>
        <title>Preview - Google Meet Clone | @shrihari689</title>
      </Helmet>
      <NavBar />
      <main className="mt-10 md:mt-14 flex items-center flex-col justify-center">
        <div className="bg-gray-900 w-4/5 md:w-2/5 h-80 text-white relative rounded-md overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <i className="material-icons text-gray-300 text-4xl">
              videocam_off
            </i>
            <p className="mt-5">You camera is off</p>
          </div>
          <div className="absolute bottom-0 pb-5 w-full flex justify-center items-center space-x-5">
            <button className="preview_icon preview_icon_off">
              <i className="material-icons">mic_off</i>
            </button>
            <button className="preview_icon preview_icon_off">
              <i className="material-icons">videocam_off</i>
            </button>
          </div>
        </div>
        <div className="mt-5 w-full flex md:flex-row flex-col items-center justify-center">
          <button className="flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-800 cursor-pointer select-none my-4 mx-2 sm:w-40 w-1/2 py-3 rounded-full">
            Join
          </button>
          <button className="flex items-center justify-center text-white bg-red-600 hover:bg-red-800 cursor-pointer select-none my-4 mx-2 sm:w-40 w-1/2 py-3 rounded-full">
            Cancel
          </button>
        </div>
      </main>
    </>
  );
};

export default PreviewPage;
