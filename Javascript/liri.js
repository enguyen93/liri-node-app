var thing = require("dotenv").config();
var keysImport = require("./keys.js");

var spotify = new Spotify(keys.spotify);

console.log("something");
console.log(keysImport);