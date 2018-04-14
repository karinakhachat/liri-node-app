require("dotenv").config();

var Twitter = require("twitter");
var spotify = require("node-spotify-api");
var keysjs = require("./keys.js");
var request = require("request");
var fs = require("fs");



//four different functions, one for each. one will be a process.argv, 

//use the request package to make an api call 
//and get back a json object 
//if process. argv 
var userComand = process.argv[2];
var userPick = process.argv[3];



var getMovie = function(movie) {
    if (movie === undefined) {
        movie = "Mr Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + userPick + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(err, res, body) {
        if(!err && res.statusCode === 200) {
            var data = JSON.parse(body);

            console.log("Title: " + data.Title);
            console.log("Year: " + data.Year);
            console.log("Rated: " + data.Rated);

        }
    })
}

getMovie(userPick); 
     
var getSpotify = function(song){
    if (song === undefined){
        spotify.request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
      .then(function (data) {
        // console.log(JSON.stringify(data, null, 2))
        var info = data.album

        console.log(
          "\nArtist: " + info.artists[0].name +
          "\nSong title: " + data.name +
          "\nAlbum name: " + info.name +
          "\nURL Preview: " + data.preview_url)
      })
      .catch(function (err) {
        console.error('Error occurred: ' + err);
      });
    }

    spotify.search({ type: 'track', query: song})
    .then(function(response) {

        var info = date.tracks.items;

    console.log(
            "\nArtist: " + info[0].artists[0].name +
            "\nSong title: " + info[0].name +
            "\nAlbum name: " + info[0].album.name +
            "\nURL Preview: " + info[0].preview_url)
  
    })
    .catch(function(err) {
      console.log(err);
    });
}

var GetTweets = function(tweet){
    var params = {
        screen_name = "RoseColoredNews",
        count: 20
    }
    client.get('statuses/RoseColoredNews_timeline', params, function(error, tweets, response) {
        if (!error) {
          console.log(tweets);
        }
      });
          }

    var DoIt = function(){
        fs.readFile("random.txt", "utf-8", function(err, data){
            if (err){
                return console.log(err);
            }
            var CommandArr = data.split(",");
            spotify
            .request('https://api.spotify.com/v1/search?q=track:' + CommandArr[1] + '&type=track')
            .then(function (data) {
                console.log("\nSong: " + JSON.stringify(data.tracks.items[0].name, null, 2));
                console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
                console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
                console.log("Spotify Link: " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify, null, 2));


            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
    });
}
       


if (userComand === "movie-this"){
    getMovie(userPick);
}

else if (userComand === "spotify-this"){
    getSpotify(userPick);
}
else if(userComand === "my-tweets"){
    GetTweets();
}