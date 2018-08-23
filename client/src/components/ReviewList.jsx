import React from 'react';

import CSSModules from 'react-css-modules';

import styles from './reviewListStyles.css';

import ReviewEntry from './ReviewEntry.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.ReviewListRef = React.createRef();
    this.reviews = this.props.reviews;
  }

  componentWillReceiveProps(nextProps) {
    this.reviews = nextProps.reviews;
  }

  render() {
    return (
      <div ref="reviewList" styleName="review-list" ref={this.props.getRef}>
        {this.reviews.map((review, index) => (
          <ReviewEntry review={review} key={index} />
        ))}
      </div>
    );
  }
}

export default CSSModules(ReviewList, styles);
