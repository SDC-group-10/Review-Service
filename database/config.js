const Promise = require('bluebird');

const initOptions = {
  promiseLib: Promise,
};

const pgp = require('pg-promise')(initOptions);

const connection = {
  user: 'christiannoh',
  host: 'localhost',
  database: 'review_db',
  password: '',
};

const db = pgp(connection);

// const db = pgp('postgresql://localhost/review_db');

module.exports = db;
