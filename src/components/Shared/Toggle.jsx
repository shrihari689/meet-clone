import { useState } from "react";

const ToggleButton = ({ on, onChange }) => {

    const [isActive, setIsActive] = useState(on);

    const handleToggle = (_) => {
        setIsActive(prev => !prev);
        onChange(!isActive);
    }

    return (
        <button onClick={handleToggle} type="button" className="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none">
            <span aria-hidden="true" className="pointer-events-none absolute w-full h-full rounded-md" />
            <span aria-hidden="true" className={(isActive ? "bg-indigo-300" : "bg-indigo-100") + " pointer-events-none absolute h-3 w-6 mx-auto rounded-full transition-colors ease-in-out duration-200"} />
            <span aria-hidden="true" className={(isActive ? "translate-x-5 bg-indigo-600  border-indigo-600" : "translate-x-0 bg-indigo-400  border-indigo-400") + " pointer-events-none absolute left-0 inline-block h-4 w-4 border rounded-full shadow transform ring-0 transition-transform ease-in-out duration-200"} />
        </button>
    );
}

export default ToggleButton;