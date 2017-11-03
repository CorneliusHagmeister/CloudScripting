var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: 'R0OA10_0QoMAAAAAAAAQThs5uOU5UFcJjc0g9RlBGJwjvpD8PTdkCAwoOw-hGnvF' });

const PATH = '/PhD/papers';
const ENDING = '.pdf';
const SEARCH = '.bibtex';
const POLLING_INTERVAL = 1; // minute


dbx.filesListFolder({path: PATH})
  .then(function(response) {
    // console.log(response);
    var curr = Date.now();
    for (entry of response.entries) {
        if (entry.name.endsWith(ENDING) ) { // also check if timestamp works
            var modified = new Date(entry.client_modified);
            // console.log(modified);
            var old = (curr - modified) / 1000 / 60; // in minutes
            // console.log("File is ", old / 1000 / 60, " minutes old");
            if (old < POLLING_INTERVAL) {
                console.log("NEW PDF!");
            } else {
                console.log("OLD PDF");
            }
        }
    }
  })
  .catch(function(error) {
    console.log(error);
  });
