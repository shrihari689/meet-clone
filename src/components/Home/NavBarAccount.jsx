import { useState } from "react";
import { auth } from "./../../utils/firebase";

const NavBarAccount = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = (_) => {
        auth.signOut();
    }

    return (
        <>
            <img
                onClick={(_) => setIsOpen(e => !e)}
                className="h-8 w-8 rounded-full ml-2 cursor-pointer hover:shadow-lg" src="https://lh3.google.com/u/1/ogw/ADGmqu9eAv3S4CI3NA-MHUQJ_vUrZr7geEk-MnlgcZpa=s32-c-mo" alt="Shri Hari L" />
            {
                isOpen && (
                    <div className="absolute top-12 right-0 bg-white select-none flex flex-col shadow-md w-28 rounded-md border">
                        <div onClick={handleLogout} className="hover:bg-gray-50 cursor-pointer text-center py-2">Logout</div>
                    </div>
                )
            }
        </>
    );
}

export default NavBarAccount;