const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const user = require("./user/user");
const event = require("./event/event");

// PWAs want HTTPS!
function checkHttps(request, response, next) {
  // Check the protocol — if http, redirect to https.
  if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    response.redirect("https://" + request.hostname + request.url);
  }
}

// app.all("*", checkHttps);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// A test route to make sure the server is up.
app.get("/api/ping", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});

// POST - api/user/user_create
app.post("/api/user/user_create", (req, _) => {
  user.create_user(req, _);
});

// POST - api/user/login
app.post("/api/user/login", (req, res) => {
  user.login(req, res);
});

app.get("/api/user/team", (req, res) => {
  user.my_team_logs(req, res);
});

// POST - api/time_log
app.post("/api/event", (req, res) => {
  event.add_event(req, res);
});

// GET - api/time_log
app.get("/api/event", (req, res) => {
  event.get_events(req, res);
});
