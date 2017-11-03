'use strict'
let scholar = require('google-scholar')
var Dropbox = require('dropbox');

var dbx = new Dropbox({ accessToken: 'op5m2s3ZXDAAAAAAAAAAJ0osNVfrsiejIg7DUXrfceYxmWEfty6oORczBcUFaKdn' });

var paper_title=process.argv[0];

scholar.search(paper_title)
  .then(resultsObj => {
    dbx.filesUpload({ path: '/Cloudscripting/test.js', contents: JSON.stringify(resultsObj) })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  })
