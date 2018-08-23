import React from 'react';
import axios from 'axios';
import path from 'path';
import CSSModules from 'react-css-modules';
import Pagination from './Pagination.jsx';
import ReviewList from './ReviewList.jsx';
import Overview from './Overview.jsx';
import styles from './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listing_id: 12345,
      allReviews: [],
      currentReviews: [],
      currentPage: null,
      totalPages: null,
      ratings: {},
    };

    this.onPageChanged = this.onPageChanged.bind(this);
    this.getReference = this.getReference.bind(this);
    this.revListRef = null;
  }

  componentDidMount() {
    this.getRatings();
    this.getReviews();
  }

  onPageChanged(data) {
    const { allReviews } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentReviews = allReviews.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentReviews, totalPages });
  }

  getReviews() {
    const listing_id = window.location.href.split('/')[5] || 12345;
    const self = this;
    axios
      .get(`http://localhost:3002/api/listing/${listing_id}/reviews`)
      .then((response) => {
        self.setState({ allReviews: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRatings() {
    const listing_id = window.location.href.split('/')[5] || 12345;
    const self = this;

    axios
      .get(`http://localhost:3002/api/listing/${listing_id}/overview`)
      .then((response) => {
        const ratingsObj = {};
        ratingsObj.total = response.data.length;
        const ratingsOptions = [
          'accuracy',
          'communication',
          'cleanliness',
          'location',
          'check_in',
          '_value',
        ];
        ratingsObj.accuracy = 0;
        ratingsObj.communication = 0;
        ratingsObj.cleanliness = 0;
        ratingsObj.location = 0;
        ratingsObj.check_in = 0;
        ratingsObj._value = 0;
        response.data.forEach((rvw) => {
          for (let i = 0; i < ratingsOptions.length; i++) {
            ratingsObj[ratingsOptions[i]] += rvw[ratingsOptions[i]];
          }
        });
        for (const key in ratingsObj) {
          if (key !== 'total') {
            ratingsObj[key] = Math.floor(ratingsObj[key] / (ratingsObj.total * 20));
          }
        }
        self.setState({ ratings: ratingsObj });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getReference(ref) {
    this.revListRef = ref;
  }

  render() {
    const {
      allReviews, currentReviews, currentPage, totalPages,
    } = this.state;
    const totalReviews = allReviews.length;

    return (
      <div styleName="main-container">
        <Overview ratings={this.state.ratings} />
        <ReviewList reviews={currentReviews} getRef={this.getReference} />
        <Pagination
          revListRef={this.revListRef}
          totalRecords={totalReviews}
          pageNeighbours={1}
          onPageChanged={this.onPageChanged}
        />
      </div>
    );
  }
}

export default CSSModules(App, styles);

// module.exports.App = App;
