const SidebarHeader = ({ title, onClose }) => {
    return (
        <div className="flex items-center justify-between w-full px-3 pb-4">
            <h3 className="text-md ml-2">{title}</h3>
            <div onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200">
                <i className="material-icons" style={{ fontSize: '18px' }}>close</i>
            </div>
        </div>
    );
}

export default SidebarHeader;