import React, { useEffect, useState } from "react";
import Axios from "axios";
import ActivityCard from "./LogCard";
import getFormattedEvents from "../../utils/getFormattedEvents";
import { Container } from "react-bootstrap";

/**
 * 
 * @returns Displays the last log for all members in a specific team
 */
function TeamLogs() {
  const [activities, setActivities] = useState([]);

  // gets team info
  function loadActivities() {
    let userID = JSON.parse(localStorage.userInfo).id;
    Axios.get(`/api/user/team`, {
      params: {
        userID: userID,
      },
    }).then((res) => {
      const data = res.data || [];
      const formattedData = getFormattedEvents(data);

      let map = new Map();
      (Object.values(formattedData)).forEach((value) => {
        map.set(value.userId, value);
      });

      setActivities(Array.from(map.values()));
    });
  }

  useEffect(() => {
    loadActivities();
  }, []);
  return (
    <Container className="mt-4">
      {activities.map((value, index) => (
        <ActivityCard key={index} activity={value} />
      ))}
    </Container>
  );
}
export default TeamLogs;
