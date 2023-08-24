import SearchBar from "component/searchBar/searchBar";
import React, { useEffect, useState } from "react";
import "./header.css";
import { genralSiceActions } from "redux/store";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();

  const onSearchKeyDown = (event) => {
    if (event.code === "Enter" && event.target.value !== "") {
      dispatch(genralSiceActions.searchTermValue(event.target.value));
    }
  };

  return (
    <div className="header-container">
      <SearchBar onKeyDown={onSearchKeyDown}></SearchBar>
      <span className="material-symbols-outlined header-home-icon material-icons md-30 ">
        home
      </span>
    </div>
  );
}
