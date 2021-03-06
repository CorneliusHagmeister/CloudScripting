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
                var old = (curr - modified) / 1000 / 60; // in minutes
                if (old < POLLING_INTERVAL) {
                    console.log("NEW PDF!");
                    exec('node actionTest.js ' + entry.name.substring(0, entry.name.length - 4), (error, stdout, stderr) => {
                        console.log(stdout);
                    });
                } else {
                    console.log("OLD PDF");
                }
            }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
}

setInterval(poll, POLLING_INTERVAL * 1000 * 60);
