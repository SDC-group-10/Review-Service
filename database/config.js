const Promise = require('bluebird');

const initOptions = {
  promiseLib: Promise,
  error(error, e) {
    if (e.cn) {
      console.log('CN:', e.cn);
      console.log('EVENT:', error.message || error);
    }
  },
};

const pgp = require('pg-promise')(initOptions);

const connection = {
  user: 'postgres',
  host: 'ec2-18-144-22-246.us-west-1.compute.amazonaws.com',
  database: 'review_db',
  port: '5432',
  password: 'password',
};

const db = pgp(connection);

// const db = pgp('postgresql://localhost/review_db');

module.exports = db;
