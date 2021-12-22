import React from "react";
import { format } from "date-fns";
import { Card } from "react-bootstrap";

/**
 * 
 * @param {props.activity} user activity 
 * @returns Display activity card for user
 */
function LogCard({ activity }) {
  return (
    <div className="mt-4 flex justify-between">
      <Card style={{ width: "24rem" }}>
        <Card.Body>
          <Card.Title>{activity.fullName}</Card.Title>
          <Card.Text>
            {activity.clockIn ? `Clocked in at: ${format(activity.clockIn, 'MMM dd, yyyy, hh:mm:ss')}` : ""}
            <br/>
            {activity.clockOut ? `Clocked out at: ${format(activity.clockOut, 'MMM dd, yyyy, hh:mm:ss')}` : ""}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
export default LogCard;
