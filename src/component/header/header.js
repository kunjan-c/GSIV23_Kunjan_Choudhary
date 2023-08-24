import SearchBar from "component/searchBar/searchBar";
import React, { useEffect, useState } from "react";
import "./header.css";
import { genralSiceActions } from "redux/store";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const[showSearchBar,setShowSearchBar]=useState(true);

  useEffect(()=>{
    console.log(location);
    if(location.pathname === "/detail-page"){
      setShowSearchBar(false)
    }
  },[location])

  const onSearchKeyDown = (event) => {
    if (event.code === "Enter" && event.target.value !== "") {
      dispatch(genralSiceActions.searchTermValue(event.target.value));
    }
  };

  return (
    <div className="header-container">
     {showSearchBar ? <SearchBar onKeyDown={onSearchKeyDown}></SearchBar> : <span className="movie-detail-text-head">Movie Details</span>} 
      <span className="material-symbols-outlined header-home-icon material-icons md-30 ">
        home
      </span>
    </div>
  );
}
