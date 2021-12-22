const db = require("../config");
const { getUniqueId } = require("../utils/getUniqueId");
// events - CLOCKED_IN, CLOCKED_OUT

// POST
const add_event = (req, res) => {
  const userId = req.body.user_id;
  const clockedIn = req.body.clocked_in; // boolean
  const timestamp = new Date();
  const shiftId = clockedIn ? getUniqueId() : req.body.shift_id;

  const query = clockedIn
    ? "INSERT INTO event_logs (shift_id, timestamp, user_id, event) VALUES (?, ?, ?, 'CLOCKED_IN')"
    : "INSERT INTO event_logs (shift_id, timestamp, user_id, event) VALUES (?, ?, ?, 'CLOCKED_OUT')";

  db.query(query, [shiftId, timestamp, userId], (err, result) => {
    if (err) res.send(err);
    else res.send(true);
  });
};

// GET
const get_events = (req, res) => {
  const userID = req.query.user_id;
  const getEvents = `
          SELECT * FROM event_logs 
          WHERE user_id = (?);
     `;
  db.query(getEvents, [userID], (err, result) => {
    if (err) res.send(err);
    else res.send(result || []);
  });
};

module.exports = { get_events, add_event };
