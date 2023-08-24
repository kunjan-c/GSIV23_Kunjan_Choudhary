import SearchBar from "component/searchBar/searchBar";
import React from "react";
import "./header.css";
export default function Header() {

  const onSearchInputChange = (event) => {
    console.log(event.target.value);

  }
  return (
    <div className="header-container">
      <SearchBar onSearchInputChange={onSearchInputChange}></SearchBar>
      <span className="material-symbols-outlined header-home-icon material-icons md-30 ">home</span>
    </div>
  );
}
