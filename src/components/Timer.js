/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Clock.css";
import useTimer from "../hooks/useTimer";
import { formatTime } from "../utils";

const Timer = ({ eventLogData = [], userId }) => {
  const [timerValue, setTimerValue] = useState(0);
  const [lastEventLog, setLastEventLog] = useState({});

  const { timer, isActive, handleStart, handleReset } =
    useTimer(timerValue);

  useEffect(() => {
    if (eventLogData.length) {
      const lastEventLog = eventLogData[(eventLogData || []).length - 1];
      setLastEventLog(lastEventLog);
      if ((lastEventLog || {}).event === "CLOCKED_IN") {
        let currentTime = new Date();
        let clockedInTime = new Date(lastEventLog.timestamp);
        const seconds = Math.floor((currentTime - clockedInTime) / 1e3);
        setTimerValue(seconds);
        handleStart();
      } else {
        setTimerValue(0);
      }
    }
  }, [eventLogData]);

  const handleClockIn = () => {
    Axios.post("/api/event", {
      clocked_in: true,
      user_id: userId,
    }).then(() => {
      handleStart();
    });
  }

  const handleClockOut = () => {
    Axios.post("/api/event", {
      clocked_in: false,
      user_id: userId,
      shift_id: lastEventLog.shift_id
    }).then(() => {
      handleReset();
    });
  }

  return (
    <div className="app">
      <div className="stopwatch-card">
        <p>{formatTime(timer)}</p>
        <div className="buttons">
          {!isActive ? (
            <button onClick={handleClockIn}>Clock In</button>
          ) : (
            <button onClick={handleClockOut}>Clock Out</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
