import React, { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css"

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search term.");
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={css.searchBtn} type="submit">Search</button>
      </form>
    </header>
  );
};

  export default SearchBar