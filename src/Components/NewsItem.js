import React from "react";
import PropTypes from 'prop-types';
import "../style.css";
import img1 from './img-1.jpg';
import img2 from './img-2.jpg';
import img3 from './img-3.jpg';
import img4 from './img-4.jpg';
import img5 from './img05.jpg';

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl } = props;

  const defaultImageUrls = [
    "https://aicl-mum-bucket.s3.ap-south-1.amazonaws.com/Production/www-tatamotors-com-NEW/wp-content/uploads/2024/06/th-7624.jpg",
    img1,
    img2,
    img3,
    img4,
    img5
  ];

  const getRandomImageUrl = () => {
    if (!defaultImageUrls || defaultImageUrls.length === 0) {
      console.error("Default image URLs array is not initialized properly.");
      return "https://via.placeholder.com/150"; // Fallback placeholder image
    }
    const randomIndex = Math.floor(Math.random() * defaultImageUrls.length);
    return defaultImageUrls[randomIndex];
  };

  return (
    <div className="card my-3 bg-dark text-light">
      <img
        src={imageUrl || getRandomImageUrl()}
        className="card-img-top"
        alt="News"
        onError={(e) => {
          e.target.onerror = null; // prevents looping
          e.target.src = getRandomImageUrl();
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          {description}
        </p>
        <a href={newsUrl} className="btn btn-primary">
          Read more
        </a>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string.isRequired
};

export default NewsItem;
