import React from 'react';
import { getDateTimeString } from '../../utils/time';

const Date = (props) => {

    const currentDate = getDateTimeString().date

    return (
        <div {...props}>{currentDate}</div>
    );
}

export default Date;