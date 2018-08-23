require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const cluster = require('cluster');
const db = require('../database/operations.js');

if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length;

  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log('Worker %d died :(', worker.id);
    cluster.fork();
  });
} else {
  var app = express();
  app.use(bodyParser.json());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '/../client/dist')));
  app.use('/api/listing/:anything/', express.static(path.join(__dirname, '/../client/dist')));

  app.get('/api/listing/:listingid/overview', (req, res) => {
    const listing_id = Number(req.params.listingid);

    db.getRatings(listing_id, (err, results) => {
      if (err) {
        console.log('err in server - overview: ', err);
        return;
      }
      res.status(200).json(results);
    });
  });

  app.get('/api/listing/:listingid/reviews', (req, res) => {
    const listing_id = Number(req.params.listingid);
    db.getReviews(listing_id, (err, results) => {
      if (err) {
        console.log('err in server - reviews: ', err);
        return;
      }
      res.status(200).json(results);
    });
  });

  app.listen(3002, console.log('Listening on port 3002'));
}

module.exports = app;
