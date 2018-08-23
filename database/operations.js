const redis = require('redis');
const db = require('./config.js');

const client = redis.createClient();

const getRatings = (listing_id, whenRatings) => {
  client.get(-listing_id, (err, result) => {
    if (result) {
      whenRatings(null, JSON.parse(result));
    } else {
      const query = 'SELECT accuracy, communication, cleanliness, location, check_in, _value FROM reviews WHERE listing_id = $1';
      db.any(query, [listing_id]).then((data) => {
        client.setex(-listing_id, 3600, JSON.stringify(data));
        whenRatings(null, data);
      });
    }
  });
};

const getReviews = (listing_id, whenReviews) => {
  client.get(listing_id, (err, result) => {
    if (result) {
      whenReviews(null, JSON.parse(result));
    } else {
      const query = 'SELECT users.name, users.photo, reviews._date, reviews.content FROM users INNER JOIN reviews on users.id = reviews.user_id WHERE reviews.listing_id = $1 ORDER BY reviews._date DESC;';
      db.any(query, [listing_id]).then((data) => {
        client.setex(listing_id, 60, JSON.stringify(data));
        whenReviews(null, data);
      });
    }
  });
};

const postReview = (listingId, review, callback) => {
  const query = `INSERT INTO reviews (listing_id, _date, content, accuracy, communication, cleanliness, location, check_in, _value) VALUES (${listingId}, ${
    review.user_id
  }, '${review._date}', '${review.content}', '${review.accuracy}', '${review.communication}', '${
    review.cleanliness
  }', '${review.location}', '${review.check_in}', '${review._value}');`;
  db.any(query, callback);
};

module.exports = {
  getRatings,
  getReviews,
};
