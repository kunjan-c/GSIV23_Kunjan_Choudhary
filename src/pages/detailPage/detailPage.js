import Header from "component/header/header";
import React, { useEffect, useState } from "react";
import "./detailPage.css";
import { useDispatch, useSelector } from "react-redux";
import minsToHrConverter from "helper/minsToHrConverter";
import { useNavigate } from "react-router";
import Loader from "component/loader/loader";
import { genralSiceActions } from "redux/store";

export default function DetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [clickedCardMovieDetail, setClickedCardMovieDetail] = useState({});
  const clickedCardId = useSelector((state) => state.data.clickedCardId);

  useEffect(() => {
    if (clickedCardId) {
      getClickedMovieCardDetail();
    } else {
      dispatch(genralSiceActions.clickedCardId(null));
      navigate("/");
    }
  }, [clickedCardId]);

  //This Fn will Call API with movie ID to fetch specific movie detail
  async function getClickedMovieCardDetail() {
    setIsLoading(true);
    try {
      const getData = await fetch(
        `https://api.themoviedb.org/3/movie/${clickedCardId}?api_key=${process.env.REACT_APP_LISTING_API_KEY}&append_to_response=credits`,
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
          setClickedCardMovieDetail(jsonRes);
          setIsLoading(false);
          return jsonRes;
        });
    } catch (error) {
      console.log(error);
      alert("Internal Server Error");
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        clickedCardId && clickedCardMovieDetail && (
          <div>
            <Header></Header>
            <div className="detail-page-container">
              <img
                className="mov-poster"
                src={`http://image.tmdb.org/t/p/w500${clickedCardMovieDetail?.poster_path}`}
                alt={clickedCardMovieDetail?.title}
              ></img>
              <div className="movie-details-container">
                <div className="mov-info mov-detail-title">
                  <span>{clickedCardMovieDetail?.title}</span>
                  <span className="details-rating-text">{`(${
                    Math.round(clickedCardMovieDetail?.vote_average * 10) / 10
                  })`}</span>
                </div>
                <div className="mov-info mov-info-gray">
                  <div className="">
                    <span>
                      {clickedCardMovieDetail?.release_date?.split("-")[0]}
                    </span>
                    <span className="divider-line mov-info-gray"> | </span>
                    <span className="mov-second-line-details">
                      {minsToHrConverter(clickedCardMovieDetail?.runtime)}
                    </span>
                    <span className="divider-line mov-info-gray"> | </span>
                    <span className="mov-second-line-details">
                      {clickedCardMovieDetail?.credits &&
                        clickedCardMovieDetail?.credits?.crew?.map((cr) =>
                          cr?.job === "Director" ? cr?.name : ""
                        )}
                    </span>
                  </div>
                </div>
                <div className="cast-name">
                  {`Cast :${clickedCardMovieDetail?.credits?.cast.map((c) => {
                    return c.name;
                  })}`}{" "}
                </div>
                <div className=" mov-detail-desc mov-info-gray">
                  {clickedCardMovieDetail.overview}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
