//imports
require("dotenv").config({ path: ".env" });

var keysImport = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keysImport.spotify);
//moment lib
var moment = require("moment");
//request lib
var request = require("request");
//fs lib
var fs = require("fs");


//
var inputString = process.argv;
var command = inputString[2];
var thingToLookUp = process.argv.slice(3).join(" ");

//Controller function
example(command, thingToLookUp);

function example(command, thingToLookUp) {

    switch (command) {
        case "spotify-this-song":
            //in the case that thingToLookUp (third argument, 4th index) doesn't exist
            if (!thingToLookUp) {
                predefinedSong();
            } else {
                spotifyThisSong(thingToLookUp);
            }
            break;
        case "concert-this":
            concertThis(thingToLookUp);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        case "movie-this":
            if (!thingToLookUp) {
                predefinedMovie();
            } else {
                movieThis(thingToLookUp);
            }
    }
}
//function that takes the parameter thingToLookUp
function movieThis(thingToLookUp) {
    var queryUrl = 'http://www.omdbapi.com/?apikey=b6ef9f19&t=' + thingToLookUp;
    //figure out how to put key into .env
    request(queryUrl, function (error, response, body) {
        // If the request is successful...
        if (!error && response.statusCode === 200) {

            // Parses the body of the site and recovers movie info.
            var movie = JSON.parse(body);

            // Prints out movie info.
            console.log("Title of the movie: " + movie.Title);
            console.log("Year the movie came out: " + movie.Year);
            console.log("IMDB rating of the movie: " + movie.imdbRating);
            //the function will break if the movie doesn't have a tomatoes rating
            console.log("Rotten Tomatoes Rating of the movie: " + movie.Ratings[1].Value);
            console.log("Country(s) where the movie was produced: " + movie.Country);
            console.log("Language of the movie: " + movie.Language);
            console.log("Plot of the movie: " + movie.Plot);
            console.log("Actors in the movie: " + movie.Actors);
        }
    });
}
//working

function predefinedMovie() {
    var queryUrl = 'http://www.omdbapi.com/?apikey=b6ef9f19&t=' + "mr nobody";
    //figure out how to put key into .env
    request(queryUrl, function (error, response, body) {
        // If the request is successful...
        if (!error && response.statusCode === 200) {

            // Parses the body of the site and recovers movie info.
            var movie = JSON.parse(body);

            // Prints out movie info.
            console.log("Title of the movie: " + movie.Title);
            console.log("Year the movie came out: " + movie.Year);
            console.log("IMDB rating of the movie: " + movie.imdbRating);
            //the function will break if the movie doesn't have a tomatoes rating
            console.log("Rotten Tomatoes Rating of the movie: " + movie.Ratings[1].Value);
            console.log("Country(s) where the movie was produced: " + movie.Country);
            console.log("Language of the movie: " + movie.Language);
            console.log("Plot of the movie: " + movie.Plot);
            console.log("Actors in the movie: " + movie.Actors);
        }
    });
}
//working

function spotifyThisSong(thingToLookUp) {
    spotify.search({ type: 'track', query: thingToLookUp + "&limit=1" }, function (err, data) {
        var song = (data.tracks.items[0].album.artists[0]);
        var album = (data.tracks.items[0].album.name);
        if (err) {
            return console.log("error" + err);
        }
        else {
            console.log("The song name is: " + thingToLookUp);
            console.log("The artist of this track is: " + song.name);
            console.log("The Spotify Preview URL: " + song.href);
            console.log("The Album name is: " + album);
        }
    });
};
//working

function predefinedSong() {

    spotify.search({ type: 'track', query: "the+sign+ace+of+base" + '&limit=1' }, function (err, data) {
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
}
//working
function concertThis(thingToLookUp) {
    var bandsInTownURL = "https://rest.bandsintown.com/artists/" + thingToLookUp + "/events?app_id=codingbootcamp";

    request(bandsInTownURL, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            // console.log(JSON.parse(body));
        }
        var concert = JSON.parse(body);
        var randomDate = concert[0].datetime;
        var randomFormat = "YYYY/MM/DD/hh:mm:ss";
        //You have to put into randomFormat the format that bandsInTownURL uses for time, or else its an invalid date when you try and reformat it
        var convertedDate = moment(randomDate, randomFormat);
        var prettyDate = moment(convertedDate).format("MM/DD/YYYY");
        console.log("Name of Venue: " + concert[0].venue.name);
        console.log("Venue Location: " + concert[0].venue.city + ', ' + concert[0].venue.country);
        console.log("Date of Event: " + prettyDate);
    })
}
//working

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        var newSong = dataArr[1];
        spotifyThisSong(newSong);
    })
};
//working