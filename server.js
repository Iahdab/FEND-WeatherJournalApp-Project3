// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies*/

const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server Port
// Port in 3000 / 8000/ 3030
const port = 3000;

// Server object
const server = app.listen(port, listeningToCheck);

// listeningToCheck is a  call back function
function listeningToCheck() {
  console.log("The Server is running now !!!");
  console.log(`running on localhost(Port) :${port}`);
}

// Get Route / Requests
// Get Function
// get with a route /all & call back function sendDataToApp
app.get("/all", sendDataToApp);

// sendDataToApp is call back function
// TODO:send data in object projectData
function sendDataToApp(req, res) {
  res.send(projectData);
}

// Post Route / Requests
// Post Function
// Post with a route /add& call back function addDataToServer
app.post("/add", addDataToServer);

// addDataToServer function
// TODO:add new data to object projectData
function addDataToServer(req, res) {
    console.log("addDataToServer func. :" + req.body);
    projectData["date"] =req.body.date;
    projectData["temp"] =req.body.temp;
    projectData["content"] = req.body.userFeeling;
    
}
