import SearchBar from "component/searchBar/searchBar";
import React from "react";
import "./header.css";
export default function Header() {
  return (
    <div className="header-container">
      <SearchBar></SearchBar>
      <span className="material-symbols-outlined header-home-icon material-icons md-30 ">home</span>
    </div>
  );
}
