const PeopleItem = ({ details: { name, image }, onMute, onPin }) => {
    return (
        <div className="flex items-center justify-between my-2">
            <div className="flex items-center">
                <img className="rounded-full h-6 w-6 object-cover" src={image} alt={name} />
                <span className="text-xs font-normal ml-2">{name}</span>
            </div>
            <div className="flex items-center space-x-4 px-1 text-gray-600">
                <div onClick={onMute} className="h-8 w-8 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100">
                    <i className="google-material-icons" style={{ fontSize: '18px' }}>mic_off</i>
                </div>
                <div onClick={onPin} className="h-8 w-8 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100">
                    <i className="google-material-icons" style={{ fontSize: '18px' }}>push_pin</i>
                </div>
            </div>
        </div>
    );
}

export default PeopleItem;