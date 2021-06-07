const Sidebar = ({ isOpen, children }) => {
    return (
        <div
            className={(isOpen ? "w-full md:w-80 pt-3 h-full z-50 top-0 right-0 absolute md:flex md:relative" : "w-0 h-0") + " flex transition-width duration-500 overflow-hidden flex-col items-center justify-between rounded-md bg-white"}
        >
            {children}
        </div>
    );
}

export default Sidebar;