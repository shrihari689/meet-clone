import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const Time = (props) => {
  const [currentTime, setCurrentTime] = useState(() =>
    dayjs().format("hh:mm A")
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs().format("hh:mm A"));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div {...props}>{currentTime}</div>;
};

export default Time;
