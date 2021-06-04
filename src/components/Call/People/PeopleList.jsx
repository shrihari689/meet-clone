import SidebarHeader from "../Shared/SidebarHeader";

const PeopleList = () => {
    return (
        <div className="hidden flex-col items-center justify-between rounded-md w-1/2 pt-3 bg-white">
            <SidebarHeader title="People" onClose={() => { }} />
            <div className="grid grid-cols-1 md:grid-cols-3 my-3">
                <div className="flex flex-col space-y-1 items-center cursor-pointer rounded-md px-2 py-3 text-gray-700 hover:bg-gray-100">
                    <i className="google-material-icons" style={{ fontSize: '18px' }}>mic_off</i>
                    <span className="text-xs text-center">All muted</span>
                </div>
                <div className="flex flex-col space-y-1 items-center cursor-pointer rounded-md px-2 py-3 text-gray-700 hover:bg-gray-100">
                    <i className="google-material-icons" style={{ fontSize: '18px' }}>person_add</i>
                    <span className="text-xs text-center">Add People</span>
                </div>
                <div className="flex flex-col space-y-1 items-center cursor-pointer rounded-md px-2 py-3 text-gray-700 hover:bg-gray-100">
                    <i className="google-material-icons" style={{ fontSize: '18px' }}>toggle_on</i>
                    <span className="text-xs text-center">Host Control</span>
                </div>
            </div>
            <section className="w-full px-3 flex-1">
                <h2 className="text-xs font-semibold my-2">IN CALL</h2>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between my-2">
                        <div className="flex items-center">
                            <img className="rounded-full h-6 w-6" src="https://lh3.googleusercontent.com/a-/AOh14GhinDC_5_G9VLzmIbRW5L0d8f6w6Kg92VxIKWSu=s32-p-k-no-mo" alt="" />
                            <span className="text-xs font-normal ml-2">SHRI HARI L (You)</span>
                        </div>
                        <div className="flex items-center space-x-4 px-1 text-gray-600">
                            <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                                <i className="google-material-icons cursor-pointer" style={{ fontSize: '18px' }}>mic_off</i>
                            </div>
                            <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                                <i className="google-material-icons cursor-pointer" style={{ fontSize: '18px' }}>push_pin</i>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between my-2">
                        <div className="flex items-center">
                            <img className="rounded-full h-6 w-6" src="https://lh3.googleusercontent.com/a-/AOh14GhinDC_5_G9VLzmIbRW5L0d8f6w6Kg92VxIKWSu=s32-p-k-no-mo" alt="" />
                            <span className="text-xs font-normal ml-2">SHRI HARI L (You)</span>
                        </div>
                        <div className="flex items-center space-x-4 px-1 text-gray-600">
                            <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                                <i className="google-material-icons cursor-pointer" style={{ fontSize: '18px' }}>mic_off</i>
                            </div>
                            <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                                <i className="google-material-icons cursor-pointer" style={{ fontSize: '18px' }}>push_pin</i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PeopleList;