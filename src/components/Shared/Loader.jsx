import loadingIcon from "./../../assets/loading.gif"

const Loader = () => {
    return (
        <div className="h-screen bg-gray-900 w-full flex flex-col items-center justify-center">
            <img src={loadingIcon} alt="Loading..." />
        </div>
    );
}

export default Loader;