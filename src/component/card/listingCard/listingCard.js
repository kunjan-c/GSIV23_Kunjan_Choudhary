import React from "react";
import "./listingCard.css";
export default function ListingCard() {
  return (
    <div className="listing-cards-container">
      <div className="listing-card">
        <img className="listing-poster"></img>
        <div className="title-rating-container">
          <div className="listing-title">MOvie Title</div>
          <div className="listing-ratings">Rating</div>
        </div>
        <div className="listing-description">description</div>
      </div>
    </div>
  );
}
