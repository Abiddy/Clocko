/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container, Tabs } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import TeamPanel from "../TeamLogs/TeamLogs";
import Timer from "../Timer/Timer";
import Timesheet from "../Timesheet/Timesheet";

/**
 * 
 * @param {props.isAuthenticated} - check if user is logged in 
 * @returns Profile component that displays timer, timesheet and teams 
 */
export default function Profile({ isAuthenticated }) {
  // https://reactrouter.com/docs/en/v6/api#usenavigate
  const navigate = useNavigate();
  const [eventLogData, setEventLogData] = useState();
  const [isLoading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.userInfo).id;

  // get events by user id if authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      Axios.get(`http://localhost:3000/api/event?user_id=${userId}`).then(
        (res) => {
          const { data } = res;
          setEventLogData(data);
          setLoading(false);
        }
      );
    }
  }, [userId]);

  return isLoading ? (
    <div>"Loading profile.."</div>
  ) : (
    <Container className="mt-4">
      <Tabs defaultActiveKey="clock" id="tab" className="mb-3">
        <Tabs eventKey="clock" title="Clock In/Clock Out">
          <Timer eventLogData={eventLogData} userId={userId} />
        </Tabs>
        <Tabs eventKey="timesheet" title="Timesheet">
          <Timesheet eventLogData={eventLogData} />
        </Tabs>
        <Tabs eventKey="team" title="Team">
          <TeamPanel />
        </Tabs>
      </Tabs>
    </Container>

  );
}
