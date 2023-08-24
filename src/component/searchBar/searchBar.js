import React from "react";
import "./searchBar.css";
export default function SearchBar({ onSearchInputChange }) {
  return (
    <div className="search-bar-container">
      <span className="material-symbols-outlined search-icon material-icons">
        search
      </span>
      <input
        className="search-text"
        type="text"
        placeholder="Search"
        onChange={onSearchInputChange}
      ></input>
    </div>
  );
}
