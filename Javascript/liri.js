//imports
require("dotenv").config({ path: "../.env" });
var keysImport = require("./keys.js");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keysImport.spotify);

var inputString = process.argv;

var command = inputString[2];
var artistBand = inputString[3];

//Spotify for songs
//Bands in Town for concerts
//OMDB for movies

if (command === "spotify-this-song") {
    spotify.search({type: 'track', query: artistBand }, function (err, data) {
        if (err) {
            return console.log("error" + err);
        }
        console.log(data);
    });
}

if (command === "concert-this") {

}

if (command === "movie-this") {
    
}