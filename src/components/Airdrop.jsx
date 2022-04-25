import React, { useState, useEffect } from "react";

const Airdrop = ({
  initialMinute = 0,
  initialSeconds = 0,
  finishedFunction,
}) => {
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          if (finishedFunction) {
            finishedFunction();
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="flex items-center justify-center py-3 px-5 border-[1px] border-gray-700 mt-4">
      <div>
        AIRDROP: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default Airdrop;
