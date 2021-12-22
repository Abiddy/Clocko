const db = require("../config");

const create_user = (req, res) => {
  const fullname = req.body.fullname;
  const password = req.body.password;
  const email = req.body.email;
  const insertUser =
    "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
  db.query(insertUser, [fullname, email, password], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  const login =
    "SELECT id, full_name FROM users WHERE (email, password) = (?, ?)";
  db.query(login, [email, password], (err, result) => {
    if ((result || []).length == 0)
      return res.status(404).send({ message: "USER NOT FOUND", err });
    else res.send(result[0]);
  });
};

const my_team_logs = (req, res) => {
  let today = new Date();
  today.setDate(today.getDate() - 1);
  today = today.toISOString().split("T")[0];
  let endToday = today + " 23:59:50";
  const userID = req.query.userID;
  const getMyTeamLogs = `SELECT users.id, users.full_name, event_logs.event, event_logs.timestamp, event_logs.shift_id
  FROM users
  JOIN event_logs on users.id = event_logs.user_id
  JOIN user_teams on users.id = user_teams.user_id
  WHERE user_teams.team_id = (SELECT team_id FROM user_teams WHERE user_id = (?));`;
  db.query(getMyTeamLogs, userID, (err, result) => {
    console.log(result);
    if (!result || result.length == 0)
      return res.status(404).send({ message: "NOT FOUND" });
    else res.send(result);
  });
};

module.exports = { create_user, login, my_team_logs };
