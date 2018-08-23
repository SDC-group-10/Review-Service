const siege = require('siege');

const go = siege().on(3002);
let count = 0;
let listingid;
let getRatings;
let getReviews;

while (count < 20000) {
  const options = [
    'first 90%',
    'last 10%',
    'last 10%',
    'last 10%',
  ]; /* ~75% of tests will test last 10% of db */
  const option = options[Math.floor(Math.random() * 4)];
  if (option === 'first 90%') {
    listingid = Math.floor(Math.random() * 1000000);
  } else {
    listingid = 9000000 + Math.floor(Math.random() * 1000000);
  }
  getReviews = go.get(`/api/listing/${listingid}/reviews`).for(1).times;
  getRatings = go.get(`/api/listing/${listingid}/overview`).for(1).times;
  count += 1;
}

getReviews.concurrent(10).attack();
getRatings.concurrent(10).attack();
