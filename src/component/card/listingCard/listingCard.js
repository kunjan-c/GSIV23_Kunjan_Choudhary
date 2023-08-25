import React, { useEffect, useState } from "react";
import "./listingCard.css";
import Loader from "component/loader/loader";
import PrimaryBtn from "component/buttons/primaryBtn/primaryBtn";
import { useDispatch, useSelector } from "react-redux";
import { genralSiceActions } from "redux/store";
import { useNavigate } from "react-router";

export default function ListingCard() {
  const [pagination, setPagination] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingMovieList, setUpcomingMovieList] = useState([]);
  const clickedSearchTerm = useSelector((state) => state.data.searchTermValue);


  useEffect(() => {
    getUpcomingMovieList();
  }, [pagination]);

  useEffect(() => {
    if (clickedSearchTerm) {
      getSearchedTermData();
    } else if (clickedSearchTerm === "") {
      getUpcomingMovieList();
      setPagination(1);
    }
  }, [clickedSearchTerm]);


  //this fn will call API and fetch upcoming movie data
  async function getUpcomingMovieList() {
    setIsLoading(true);
    try {
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
          console.log(jsonRes.results);
          const sortedMovieDataByLatestReleaseDate = jsonRes.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
          setUpcomingMovieList(sortedMovieDataByLatestReleaseDate);
          dispatch(genralSiceActions.listData(jsonRes.results));
          setIsLoading(false);
          return jsonRes;
        });
    } catch (error) {
      console.log(error);
      alert("Internal Server Error");
      setIsLoading(false);
    }
  }

  //this fn will featch show Search Term Related movie Data
  async function getSearchedTermData() {
    setIsLoading(true);
    try {
    
      const getData = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${clickedSearchTerm}&api_key=${process.env.REACT_APP_LISTING_API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((jsonRes) => {
          console.log(jsonRes);
          setIsLoading(false);
          setUpcomingMovieList(jsonRes.results);
          dispatch(genralSiceActions.listData(jsonRes.results));
          return jsonRes;
        });
    } catch (error) {
      console.log(error);
      alert("Internal Server Error");
      setIsLoading(false);
    }
  }

  //this fn will handle pagination update
  const onPaginationBtnClickHandler = (e) => {
    if (e.target.id === "nextBtn") {
      setPagination((pagination) => pagination + 1);
    } else if (pagination > 1) {
      setPagination((pagination) => pagination - 1);
    }
  };

  //this fn will pass card click id to fetch movie detail
  const onCardClickHandler = (id) => {
    dispatch(genralSiceActions.clickedCardId(id));
    navigate("detail-page");
  };

  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div>
          {upcomingMovieList?.length ? (
            <div>
              <div className="listing-cards-container">
                {upcomingMovieList?.length ? (
                  upcomingMovieList.map((movie) => {
                    return (
                      <div
                      key={movie.id}
                        className="listing-card cursor-pointer"
                        onClick={() => onCardClickHandler(movie.id)}
                      >
                        <img
                          className="listing-poster"
                          src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                        ></img>
                        <div className="title-rating-container">
                          <div className="listing-title">{movie.title}</div>
                          <div className="listing-ratings">
                            {movie.vote_average}
                          </div>
                        </div>
                        <div className="listing-description">
                          {movie.overview}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>NO MOVIE FOUND</p>
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
            </div>
          ) : (
            <p>DATA NOT FOUND</p>
          )}
        </div>
      )}
    </div>
  );
}
