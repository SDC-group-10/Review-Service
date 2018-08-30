require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const cluster = require('cluster');
const db = require('../database/operations.js');

const app = express();

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

  app.get('/api/loader', (req, res) => {
    res.sendFile(path.join(__dirname, './loader/loaderIds.json'));
  });

  const loaderToken = '/../client/dist/loaderio-2fcf5b10f65c176a39b2c94ac34fb94a.txt';

  app.get('/loaderio-2fcf5b10f65c176a39b2c94ac34fb94a', (req, res) => {
    res.sendFile(path.join(__dirname, loaderToken));
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
