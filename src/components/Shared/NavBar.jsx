import { Link } from "react-router-dom";
import NavBarAccount from "../Home/NavBarAccount";
import Date from "../Shared/Date";
import Time from "../Shared/Time";
import meetLogo from "./../../assets/meet_logo.png";

const NavBar = () => {
  return (
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
        <a
          target="_blank"
          rel="noreferrer"
          href="https://apps.google.com/"
          className="h-10 w-10 ml-5 flex items-center justify-center hover:bg-gray-100 cursor-pointer rounded-full"
        >
          <i className="google-material-icons text-gray-600">apps</i>
        </a>
        <NavBarAccount />
      </div>
    </nav>
  );
};

export default NavBar;
