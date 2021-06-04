const Sidebar = ({ isOpen, children }) => {
    return (
        <div className={(isOpen ? "w-full md:w-1/4 pt-3 h-auto" : "w-0 h-0") + "  flex transition-width duration-500 overflow-hidden flex-col items-center justify-between rounded-md bg-white"}>
            {children}
        </div>
    );
}

export default Sidebar;