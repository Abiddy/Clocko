/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import useTimer from "../../hooks/useTimer";
import { formatTime } from "../../utils";

/**
 * 
 * @param {props.eventLogData} - event logs 
 * @param {props.userId} -user id
 * @returns Clock in/Clock out timer
 */
const Timer = ({ eventLogData = [], userId }) => {
  const [timerValue, setTimerValue] = useState(0);
  const [lastEventLog, setLastEventLog] = useState({});
  const { timer, isActive, handleStart, handleReset } = useTimer(timerValue);

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

  // handles request to post clock in data
  const handleClockIn = () => {
    Axios.post("http://localhost:3000/api/event", {
      clocked_in: true,
      user_id: userId,
    }).then(() => {
      handleStart();
    });
  };

  // handles request to post clock out data
  const handleClockOut = () => {
    Axios.post("http://localhost:3000/api/event", {
      clocked_in: false,
      user_id: userId,
      shift_id: lastEventLog.shift_id,
    }).then(() => {
      handleReset();
    });
  };

  return (
    <Container className="mt-4">
      <Card className="text-center">
        <Card.Header>Clock in/Clock out</Card.Header>
        <Card.Body>
          <Card.Text>{formatTime(timer)}</Card.Text>
          {!isActive ? (
            <Button onClick={handleClockIn} variant="primary">
              Clock In
            </Button>
          ) : (
            <Button onClick={handleClockOut} variant="primary">
              Clock Out
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Timer;
