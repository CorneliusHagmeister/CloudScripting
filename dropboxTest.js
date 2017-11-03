var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: 'R0OA10_0QoMAAAAAAAAQThs5uOU5UFcJjc0g9RlBGJwjvpD8PTdkCAwoOw-hGnvF' });
const { exec } = require('child_process');

const PATH = '/PhD/papers';
const ENDING = '.pdf';
const POLLING_INTERVAL = parseFloat(process.argv[2]) || 1; // minute

function poll() {
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
                    // exec("node test.js");
                    exec('node test.js ' + entry.name, (error, stdout, stderr) => {
                        console.log(stdout);
                    });
                }
            }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
}

setInterval(poll, POLLING_INTERVAL * 1000 * 60);
