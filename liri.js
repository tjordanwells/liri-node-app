require("dotenv").config();

var request = require("require");

var keys = require("/keys.js");

var twitter = require("twitter");

var spotify = require("spotify");

var fs = require("fs");

var action = process.argv[2];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(spotify);





