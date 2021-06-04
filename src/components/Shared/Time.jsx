import React, { useEffect, useState } from 'react';
import { getDateTimeString } from '../../utils/time';

const Time = (props) => {

    const [currentTime, setCurrentTime] = useState(getDateTimeString().time)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getDateTimeString().time);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, [])

    return (
        <div {...props}>{currentTime}</div>
    );
}

export default Time;