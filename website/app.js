/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Create a API key & baseUrl Variables -> to get access to weather api
let baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=6e1049e9c561229f6abaabca16b85600";

// Create event listener to button element & and add an performAction
document
  .getElementById("generate")
  .addEventListener("click", performActionGetUserData);

// performActionGetUserData is Call back function
// TODO: get the user input Zip & feeling
function performActionGetUserData(e) {
  const cityZip = document.getElementById("zip").value;
  const userFeelings = document.getElementById("feelings").value;
  getWeatherAPI(baseUrl, cityZip, apiKey).then(function(data) {
    console.log("performActionGetUserData .then func. : " + data);
    //add data to post request
    postData("http://localhost:3000/add", {
      date: newDate,
      temp: data.main.temp,
      content: userFeelings,
    });
    // to update ui elements with the new data.
    updateUI();
  });
}


// function getWeatherAPI from web api
// TODO: to get data from the weather api with specific zip address
const getWeatherAPI = async (baseUrl, cityZip, apiKey) => {
  const res = await fetch(baseUrl + cityZip + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// function postData 
// TODO: to post the data to /add path in the server 
const postData = async (url = "", data = {}) => {
  console.log("postData function " + data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // body
    body: JSON.stringify(data),
  });
// try & catch to handle any errors . 
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};


// function updateUI 
// TODO: to update the browser UI with the new data from the server with path all  
const updateUI = async () => {
  console.log("UI is updating ");
    const request = await fetch("http://localhost:3000/all");
    // try & catch to handle any errors . 
  try {
    const allData = await request.json(); // all received data form server
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${allData.temp}`;
    document.getElementById(
      "content"
    ).innerHTML = `Content/User feeling: ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
