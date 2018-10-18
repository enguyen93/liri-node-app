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

// if (command === "spotify-this-song") {
//     spotify.search({type: 'track', query: artistBand + "&limit=1" }, function (err, data) {
//         if (err) {
//             return console.log("error" + err);
//         }
//         // console.log(data.tracks.items[0].album.name);
//         var shortHand = (data.tracks.items[0].album.artists[0]);
//         var albumShorthand = (data.tracks.items[0].album.name);

//         console.log("The song name is: " + artistBand);
//         console.log("The artist of this track is: " + shortHand.name);
//         console.log("The Spotify Preview URL: " + shortHand.href);
//         console.log("The Album name is: " + albumShorthand);


//     });
// }



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
// console.log(spotify.lookup(type: 'track', 


switch (command) {
    case "spotify-this-song":
        if (artistBand === "") {
            predefinedSong();
        }
        spotifyThisSong();
        break;

    // case "concert-this":
}


function spotifyThisSong() {

    spotify.search({ type: 'track', query: artistBand + "&limit=1" }, function (err, data) {
        var shortHand = (data.tracks.items[0].album.artists[0]);
        var albumShorthand = (data.tracks.items[0].album.name);
        if (err) {
            return console.log("error" + err);
        }
        else {
            console.log("The song name is: " + artistBand);
            console.log("The artist of this track is: " + shortHand.name);
            console.log("The Spotify Preview URL: " + shortHand.href);
            console.log("The Album name is: " + albumShorthand);
        }
    });
};


function predefinedSong() {

    spotify.search({ type: 'track', query: + "The Sign Ace of Base" }, function (err, data) {
        var shortHand = (data.tracks.items[0].album.artists[0]);
        var albumShorthand = (data.tracks.items[0].album.name);
        if (err) {
            return console.log("error" + err);
        }
        console.log("The song name is: " + artistBand);
        console.log("The artist of this track is: " + shortHand.name);
        console.log("The Spotify Preview URL: " + shortHand.href);
        console.log("The Album name is: " + albumShorthand);
    })

}