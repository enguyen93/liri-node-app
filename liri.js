//imports
require("dotenv").config({ path: ".env" });
var keysImport = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keysImport.spotify);

var request = require("request");
var fs = require("fs");


var inputString = process.argv;
var command = inputString[2];
var thingToLookUp = inputString[3];

//Spotify for songs
//Bands in Town for concerts
//OMDB for movies
//Controller function
example(command, thingToLookUp);

//working
function example(command, thingToLookUp) {

switch (command) {
    case "spotify-this-song":
        if (thingToLookUp === "") {
            predefinedSong();
        } else {
            spotifyThisSong(thingToLookUp);
        }
        break;
    case "concert-this":
        concertThis();
    case "do-what-it-says":
        doWhatItSays();
        break;
}
}

function spotifyThisSong(thingToLookUp) {
    //working
    spotify.search({ type: 'track', query: thingToLookUp + "&limit=1" }, function (err, data) {
        var shortHand = (data.tracks.items[0].album.artists[0]);
        var albumShorthand = (data.tracks.items[0].album.name);
        if (err) {
            return console.log("error" + err);
        }
        else {
            console.log("The song name is: " + thingToLookUp);
            console.log("The artist of this track is: " + shortHand.name);
            console.log("The Spotify Preview URL: " + shortHand.href);
            console.log("The Album name is: " + albumShorthand);
        }
    });
};


function predefinedSong() {
    
    spotify.search({ type: 'track', query: newQuery + '&limit=1' }, function (err, data) {
        var shortHand = (data.tracks.items[0].album.artists[0]);
        var albumShorthand = (data.tracks.items[0].album.name);
        if (err) {
            return console.log("error" + err);
        }
        console.log("The song name is: " + thingToLookUp);
        console.log("The artist of this track is: " + shortHand.name);
        console.log("The Spotify Preview URL: " + shortHand.href);
        console.log("The Album name is: " + albumShorthand);
    })
    //for some reason its returning a different band search
    
}

function concertThis(thingToLookUp) {
    var bandsInTownURL = "https://rest.bandsintown.com/artists/" + thingToLookUp + "/events?app_id=codingbootcamp";

    request(bandsInTownURL, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log(body);
        }
    })
}
//only returns an empty array
//node liri.js concert-this "all time low"


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // console.log(data);

        var dataArr = data.split(",");
        // console.log(dataArr);
        // var newCommand = dataArr[0];
        var newSong = dataArr[1];
        //figure out how to use the newSong variable to replace "thingToLookUp" that's in the function
        spotifyThisSong(newSong);
    }
    )
};  
//not working properly returns some other song, william ryan fritch