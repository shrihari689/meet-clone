import React, { useEffect, useState } from 'react';
import { getDateTimeString } from '../../utils/time';

const Date = (props) => {

    const [currentDate, _] = useState(getDateTimeString().date)

    return (
        <div {...props}>{currentDate}</div>
    );
}

export default Date;