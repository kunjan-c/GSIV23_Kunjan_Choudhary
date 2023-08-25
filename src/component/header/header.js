import SearchBar from "component/searchBar/searchBar";
import React, { useEffect, useState } from "react";
import "./header.css";
import { genralSiceActions } from "redux/store";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(true);
console.log("testing");
  useEffect(() => {
    if (location.pathname === "/detail-page") {
      setShowSearchBar(false);
    }
  },[location]);

  const onSearchKeyDown = (event) => {
    if (event.code === "Enter") {
      dispatch(genralSiceActions.searchTermValue(event.target.value));
    }
  };

  const onSearchInputChangeHandler = (e) => {
    if (e.target.value === "") {
      dispatch(genralSiceActions.searchTermValue(e.target.value));
    }
  };

  const navigateHomePage = () => {
    navigate("/");
  };

  return (
    <div className="header-container">
      {showSearchBar ? (
        <SearchBar
          onKeyDown={onSearchKeyDown}
          onChange={onSearchInputChangeHandler}
        ></SearchBar>
      ) : (
        <div className="movie-detail-header-content">
          <span onClick={navigateHomePage} class="material-symbols-outlined cursor-pointer">
            arrow_back
          </span>

          <span className="movie-detail-text-head">Movie Details</span>
        </div>
      )}
      <span
        className="material-symbols-outlined header-home-icon material-icons md-30 cursor-pointer"
        onClick={navigateHomePage}
      >
        home
      </span>
    </div>
  );
}
