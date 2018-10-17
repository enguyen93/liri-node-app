//imports
require("dotenv").config({ path: ".env" });
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



//Spotify for songs
//Bands in Town for concerts
//OMDB for movies

// switch (command) {
//     case "spotify-this-song":
//         var songName = argument;
//         if (songName === "") {
//             spotify.lookup({ type: 'track', id: '3DYVWvPh3kGwPasp7yjahc' }, function (err, data) {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 logOutput("Artist: " + data.artists[0].name);
//                 logOutput("Song: " + data.name);
//                 logOutput("Spotify Preview URL: " + data.preview_url);
//                 logOutput("Album Name: " + data.album.name);
//             })
//         }
//         spotifyThisSong();
// }
// console.log(spotify.lookup(type: 'track', ))


// function spotifyThisSong()