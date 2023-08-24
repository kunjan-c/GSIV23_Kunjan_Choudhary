import React, { useEffect, useState } from "react";
import "./listingCard.css";
import Loader from "component/loader/loader";
import PrimaryBtn from "component/buttons/primaryBtn/primaryBtn";

export default function ListingCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingMovieList, setUpcomingMovieList] = useState([]);
  const [pagination, setPagination] = useState(1);
  useEffect(() => {
    getUpcomingMovieList();
  }, [pagination]);

  async function getUpcomingMovieList() {
    setIsLoading(true);
    try {
      const listingKey = `${process.env.REACT_APP_LISTING_API_KEY}`;
      console.log(listingKey);
      const getData = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?page=${pagination}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${process.env.REACT_APP_LISTING_TOKEN}`,
          },
        }
      )
        .then((res) => res.json())
        .then((jsonRes) => {
          console.log(jsonRes);
          setUpcomingMovieList(jsonRes.results);
          setIsLoading(false);
          return jsonRes;
        });
    } catch (error) {
      console.log(error);
      alert("Internal Server Error");
      setIsLoading(false);
    }
  }

  //this will handle pagination update
  const onPaginationBtnClickHandler = (e) => {
    if (e.target.id === "nextBtn") {
      setPagination((pagination) => pagination + 1);
    } else if (pagination > 1) {
      setPagination((pagination) => pagination - 1);
    }
  };

  return (
    <>
      <div className="listing-cards-container">
        {isLoading ? (
          <Loader></Loader>
        ) : (
          upcomingMovieList.map((movie) => {
            return (
              <div className="listing-card">
                <img
                  className="listing-poster"
                  src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                ></img>
                <div className="title-rating-container">
                  <div className="listing-title">{movie.title}</div>
                  <div className="listing-ratings">{movie.vote_average}</div>
                </div>
                <div className="listing-description">{movie.overview}</div>
              </div>
            );
          })
        )}
      </div>
      <div className="pagination-btns-container">
        <PrimaryBtn
          btnText="Previous"
          onClick={onPaginationBtnClickHandler}
          id="prviousBtn"
        ></PrimaryBtn>
        <PrimaryBtn
          btnText="Next"
          onClick={onPaginationBtnClickHandler}
          id="nextBtn"
        ></PrimaryBtn>
      </div>
    </>
  );
}
