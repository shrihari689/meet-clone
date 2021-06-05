import { useEffect, useRef, useState } from "react";
import { auth } from "./../../utils/firebase";

const NavBarAccount = () => {
    const [isOpen, setIsOpen] = useState(false);
    const optionsRef = useRef()

    useEffect(() => {
        optionsRef.current?.focus();
    }, [isOpen])

    const handleLogout = (_) => {
        auth.signOut();
    }

    return (
        <>
            <img
                tabIndex={0}
                onFocus={(_) => setIsOpen(true)}
                className="h-8 w-8 rounded-full ml-2 cursor-pointer hover:shadow-lg"
                src="https://lh3.googleusercontent.com/a-/AOh14GhinDC_5_G9VLzmIbRW5L0d8f6w6Kg92VxIKWSu=s48"
                alt="Shri Hari L" />
            {
                isOpen && (
                    <div
                        ref={optionsRef}
                        tabIndex={1}
                        onBlur={(_) => setIsOpen(false)}
                        className="absolute top-12 right-0 bg-white select-none flex flex-col shadow-md w-28 rounded-md border">
                        <div onClick={handleLogout} className="hover:bg-gray-50 cursor-pointer text-center py-2">Logout</div>
                    </div>
                )
            }
        </>
    );
}

export default NavBarAccount;