require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var command = process.argv[2];
var search = process.argv[3];

//Twitter handling

var twitter = require("twitter");
var client = new twitter(keys.twitter);
var params = {
    screen_name: "thebornagainsNC",
    count: 20
};

function tweet() {
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {
            console.log("----------------------------------------------------------");
            console.log("Last 20 Tweets:\n")
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log("Created on: " + tweets[i].created_at + "\n");
                fs.appendFile("./log.txt", "COMMAND: " + command + " " + search + "\n" + "RESULT: " + "\n" + tweets[i].text + "\n" + "Created on: " + tweets[i].created_at + "\n");
            }
        }
    });
};

if (command === "my-tweets") {
    tweet();
};

//Spotify handling
var spotify = require("node-spotify-api");
var spotifyReq = new spotify(keys.spotify);

if (command === "spotify-this-song") {

    if (search == null) {
        spotifyReq.search({ type: 'track', query: "The Sign" }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
        console.log("----------------------------------------------------------");
        console.log("Artist: " + data.tracks.items[5].artists[0].name);
        console.log("Name: " + data.tracks.items[5].name);
        console.log("Link: " + data.tracks.items[5].preview_url);
        console.log("Album: " + data.tracks.items[5].album.name);
        console.log("----------------------------------------------------------");
        fs.appendFile("./log.txt", "COMMAND: " + command + " " + search + "\n" + "RESULT: " + "\n" + "Artist: " + data.tracks.items[5].artists[0].name + "\n" + "Name: " + data.tracks.items[5].name + "\n" + "Link: " + data.tracks.items[5].preview_url + "\n" + "Album: " + data.tracks.items[5].album.name + "\n");
        });
    }
    else{
        spotifyReq.search({ type: 'track', query: search.toString() }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
        console.log("----------------------------------------------------------");
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Name: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("----------------------------------------------------------");
        fs.appendFile("./log.txt", "COMMAND: " + command + " " + search + "\n" + "RESULT: " + "\n" + "Artist: " + data.tracks.items[0].album.artists[0].name + "\n" + "Name: " + data.tracks.items[0].name + "\n" + "Link: " + data.tracks.items[0].preview_url + "\n" + "Album: " + data.tracks.items[0].album.name + "\n");
        });
    };
};

//OMDB handling

var request = require("request");

if (command === "movie-this") {
    if (search == null) {
        request("http://www.omdbapi.com/?apikey=trilogy&t=" + "Mr. Nobody", function(error, response, body){
            if (!error && response.statusCode == 200) {
                var movJSON = JSON.parse(body);
                console.log("----------------------------------------------------------");
                console.log("Title: " + movJSON.Title + "\n");
                console.log("Released: " + movJSON.Year + "\n");
                console.log("IMDB Rating: " + movJSON.imdbRating + "\n");
                console.log("Rotten Tomatoes Rating: " + movJSON.Ratings[1].Value + "\n");
                console.log("Country: " + movJSON.Country + "\n");
                console.log("Language: " + movJSON.Language + "\n");
                console.log("Plot: " + movJSON.Plot + "\n");
                console.log("Starring: " + movJSON.Actors);
                console.log("----------------------------------------------------------");
                fs.appendFile("./log.txt", "COMMAND: " + command + " " + search + "\n" + "RESULT: " + "\n" + "Title: " + movJSON.Title + "\n" + "Released: " + movJSON.Year + "\n" + "IMDB Rating: " + movJSON.imdbRating + "\n" + "Rotten Tomatoes Rating: " + movJSON.Ratings[1].Value + "\n" + "Country: " + movJSON.Country + "\n" + "Language: " + movJSON.Language + "\n" + "Plot: " + movJSON.Plot + "\n" + "Starring: " + movJSON.Actors + "\n");
            };
        });
    }
    else {
        request("http://www.omdbapi.com/?apikey=trilogy&t=" + search, function(error, response, body){
            if (!error && response.statusCode == 200) {
                var movJSON = JSON.parse(body);
                console.log("----------------------------------------------------------");
                console.log("Title: " + movJSON.Title + "\n");
                console.log("Released: " + movJSON.Year + "\n");
                console.log("IMDB Rating: " + movJSON.imdbRating + "\n");
                console.log("Rotten Tomatoes Rating: " + movJSON.Ratings[1].Value + "\n");
                console.log("Country: " + movJSON.Country + "\n");
                console.log("Language: " + movJSON.Language + "\n");
                console.log("Plot: " + movJSON.Plot + "\n");
                console.log("Starring: " + movJSON.Actors);
                console.log("----------------------------------------------------------");
                fs.appendFile("./log.txt", "COMMAND: " + command + " " + search + "\n" + "RESULT: " + "\n" + "Title: " + movJSON.Title + "\n" + "Released: " + movJSON.Year + "\n" + "IMDB Rating: " + movJSON.imdbRating + "\n" + "Rotten Tomatoes Rating: " + movJSON.Ratings[1].Value + "\n" + "Country: " + movJSON.Country + "\n" + "Language: " + movJSON.Language + "\n" + "Plot: " + movJSON.Plot + "\n" + "Starring: " + movJSON.Actors + "\n");
            };
        });
    };
};

//random.txt handling

if (command === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
        else {
            var textArr = data.split(",");
            command = textArr[0];
            search = textArr[1];

            spotifyReq.search({ type: 'track', query: search.toString() }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
                }
            console.log("----------------------------------------------------------");
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Name: " + data.tracks.items[0].name);
            console.log("Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("----------------------------------------------------------");
            fs.appendFile("./log.txt", "COMMAND: " + command + " " + search + "\n" + "RESULT: " + "\n" + "Artist: " + data.tracks.items[0].album.artists[0].name + "\n" + "Name: " + data.tracks.items[0].name + "\n" + "Link: " + data.tracks.items[0].preview_url + "\n" + "Album: " + data.tracks.items[0].album.name + "\n");
            });
        };
    });
};
