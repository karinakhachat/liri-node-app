require("dotenv").config();
var Twitter = require("twitter");
var spotify = require("node-spotify-api");
var keysjs = require("./keys.js");
var request = require("request");
var fs = require("fs");


//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

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
if (userPick === null && userComand == "movie-this") {

    var queryUrl = "http://www.omdbapi.com/?t='Mr.Nobody'&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            console.log("Release Year: " + JSON.parse(body).Year);
        }
    });
}

if (userComand == "my-tweets") {
    var params = { screen_name: 'RoseColoredNews', count: 20 };
    twitter.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi", params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    },
        fs.appendFile("random.txt", ", -" + tweets, function (err) {
            if (err) {
                return console.log(err);
            }
        })


    )
}

if (userComand == "spotify-this") {
    function Spotify() {
        spotify.search({
            type: 'track',
            query: title,
            limit: 1,
        }, function (err, data) {
            if (data) {
                var info = data.tracks.items
                var Spotifyinfo =
                    "\nSong title: " + info[0].name +
                    "\nAlbum name: " + info[0].album.name +
                    "\nURL Preview: " + info[0].preview_url +
                    console.log(Spotifyinfo)
                fs.appendFile("log.txt", logSpotify, function (err) {
                    if (err) {
                        return console.log("No song has been Spotified!");
                    };
                });
            }
        })
    }
}