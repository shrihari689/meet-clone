import googleMeetIcon from "../assets/google_meet_icon.png"
import googleIcon from "../assets/google_icon.png"
import firebase, { auth } from "./../utils/firebase"
const LoginPage = () => {

    const handleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithRedirect(provider).then(result => {
            console.log(result);
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div className="h-screen bg-gray-900 w-full flex flex-col items-center justify-center">
            <div className="w-32 h-32 object-cover">
                <img src={googleMeetIcon} alt="Google Meet" />
            </div>
            <div className="text-xl my-2 text-gray-200">Google Meet Clone</div>
            <div className="text-sm mt-2 mb-10 text-gray-200">
                <span className="mr-2">by</span>
                <a target="_blank" rel="noreferrer" className="text-yellow-500 hover:underline font-bold" href="https://www.linkedin.com/in/shrihari689/">SHRI HARI L</a></div>
            <div onClick={handleLogin} className="flex items-center bg-white select-none hover:bg-gray-200 rounded-md shadow-md hover:shadow-lg cursor-pointer py-2 px-3 transform hover:scale-105 transition-all duration-200 ease-in-out active:scale-90">
                <img className="h-5 w-5" src={googleIcon} alt="Google" />
                <span className="ml-2 text-blue-900 font-semibold">Login with Google</span>
            </div>
        </div>
    );
}

export default LoginPage;