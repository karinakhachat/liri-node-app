require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-Spotify-api");
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs")
//four different functions, one for each. one will be a process.argv,

//use the request package to make an api call 
//and get back a json object 
//if process. argv 
var info = process.argv;
var userComand = process.argv[2];

var userPick =  ""
if (process.argv[3] !== undefined) {
   for (i = 3; i < info.length; i++) {
       userPick += info[i] + " ";
   };
};

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



var getMovie = function (movie) {
    if (process.argv[3] === undefined) {
        userPick= "Mr.+Nobody"
    }
   
    var queryUrl = "http://www.omdbapi.com/?t=" + userPick + "&y=&plot=short&apikey=trilogy";

   request(queryUrl, function (err, res, body) {
       if (!err && res.statusCode === 200) {
           var data = JSON.parse(body);

           console.log("Title: " + data.Title);
           console.log("Year: " + data.Year);
           console.log("Rated: " + data.Rated);

       }
   })
}



var getSpotify = function (song) {
    if (song === undefined) {
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

    spotify.search({ type: 'track', query: song })
        .then(function (response) {
            console.log(JSON.stringify(response.tracks.items[0], null, 2));
            //var info = .tracks.items;
            console.log(
                "\nArtist: " + response.items[0].artists[0].name +
                "\nSong title: " + response.items[0].name +
                "\nAlbum name: " + response.items[0].album.name +
                "\nURL Preview: " + response.items[0].preview_url)

        })
        .catch(function (err) {
            console.log(err);
        });
}

var getTweets = function(tweet) {
    var params = {
        screen_name: 'RoseColoredNews',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                var logTweets = "Tweet: " + tweets[i].text + "\n    Created: " + tweets[i].created_at;
                console.log(logTweets);
            }
        }
    });
 }


var DoIt = function () {
    fs.readFile("random.txt", "utf-8", function (err, data) {
        if (err) {
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



if (userComand === "movie-this") {
    getMovie(userPick);

}

else if (userComand === "spotify-this") {
    getSpotify(userPick);
}
else if (userComand === "my-tweets") {
    getTweets();
}