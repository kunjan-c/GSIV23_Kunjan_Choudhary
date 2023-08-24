import React, { useEffect, useState } from "react";
import "./listingCard.css";
import Loader from "component/loader/loader";
import PrimaryBtn from "component/buttons/primaryBtn/primaryBtn";
import { useDispatch, useSelector } from "react-redux";
import { genralSiceActions } from "redux/store";

export default function ListingCard() {
  const dispatch = useDispatch();
  const clickedSearchTerm  = useSelector((state) => state.data.searchTermValue);
  console.log(clickedSearchTerm);
  const listData  = useSelector((state) => state.data.listData);
  
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingMovieList, setUpcomingMovieList] = useState([]);
  const [pagination, setPagination] = useState(1);
  useEffect(() => {
    getUpcomingMovieList();
  }, [pagination]);

  useEffect(()=>{
    getSearchedTermData()
  },[clickedSearchTerm])



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

  //this will show Search Term Related Data
  async function getSearchedTermData() {
    setIsLoading(true);
    try {
      const listingKey = `${process.env.REACT_APP_LISTING_API_KEY}`;
      console.log(listingKey);
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
          // setUpcomingMovieList(jsonRes.results);
          // dispatch(genralSiceActions.listData(jsonRes.results));
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

  const onCardClickHandler = (id) => {
    console.log(id);
    dispatch(genralSiceActions.clickedCardId(id));
  }
  return (
    <>
      <div className="listing-cards-container">
        {isLoading ? (
          <Loader></Loader>
        ) : (
          upcomingMovieList.map((movie) => {
            return (
              <div className="listing-card" onClick={()=>onCardClickHandler(movie.id)}>
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
