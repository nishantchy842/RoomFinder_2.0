import React from "react";
import "./searchbar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <form className="search-container">
        <input
          type="text"
          id="search-bar"
          placeholder="What can I help you with today?"
        />
        <a href="#">
          <img
            className="search-icon"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
          />
        </a>
      </form>
    </div>
  );
};

export default SearchBar;
