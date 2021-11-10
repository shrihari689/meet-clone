import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const Date = (props) => {
  const [currentDate, setCurrentDate] = useState(() =>
    dayjs().format("DD MMM YYYY")
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(dayjs().format("DD MMM YYYY"));
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return <div {...props}>{currentDate}</div>;
};

export default Date;
