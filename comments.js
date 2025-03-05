// Create web server

// Import the express module
const express = require("express");
// Create an express application
const app = express();
// Import the path module
const path = require("path");
// Import the fs module
const fs = require("fs");
// Import the body-parser module
const bodyParser = require("body-parser");
// Import the express-session module
const session = require("express-session");

// Set the views directory
app.set("views", path.join(__dirname, "views"));
// Set the view engine
app.set("view engine", "pug");

// Add a middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
// Add a middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));
// Add a middleware to add a session
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));

// Add a middleware to check if the user is logged in
app.use((req, res, next) => {
  // If the user is logged in
  if (req.session.loggedIn) {
    // Set the local variable loggedIn to true
    res.locals.loggedIn = true;
  }
  // If the user is not logged in
  else {
    // Set the local variable loggedIn to false
    res.locals.loggedIn = false;
  }
  // Call the next middleware
  next();
});

// Add a middleware to check if the user is logged in
function checkLogin(req, res, next) {
  // If the user is not logged in
  if (!req.session.loggedIn) {
    // Redirect the user to the login page
    res.redirect("/login");
  }
  // If the user is logged in
  else {
    // Call the next middleware
    next();
  }
}

// Add a route to the home page
app.get("/", (req, res) => {
  // Read the comments from the comments.json file
  fs.readFile(path.join(__dirname, "comments.json"), (err, data) => {
    // If an error occurred
    if (err) {
      // Send an error message
      res.send("An error occurred.");
    }
    // If there are no errors
    else {
      // Parse the comments
      const comments = JSON.parse(data);
      // Render the home page
      res.render("index", { comments });
    }
  });
});

// Add a
