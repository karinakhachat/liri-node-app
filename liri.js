require("dotenv").config();
var keysjs = require("./keys.js");
var request = require("request");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//four different functions, one for each. one will be a process.argv, 

//use the request package to make an api call 
//and get back a json object 
//if process. argv 
var userComand = process.argv[2];
var userPick = process.argv[3];

if (userComand === "movie-this") {


    function getMovie(userPick) {

        var queryUrl = "http://www.omdbapi.com/?t=" + userPick + "&y=&plot=short&apikey=trilogy";


        request(queryUrl, function (error, response, body) {

            // If the request is successful
            if (!error && response.statusCode === 200) {

                console.log("Release Year: " + JSON.parse(body).Year);
            }
        });
    }
}
if (userComand === null){

    var queryUrl = "http://www.omdbapi.com/?t='Mr.Nobody'&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            console.log("Release Year: " + JSON.parse(body).Year);
        }
    });
}


        function getSpotify() {
            //documentation
        }

        function getTweet() {
            //document get started area
        }

        function doWhatitsays() {

        }