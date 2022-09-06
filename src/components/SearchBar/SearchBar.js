import { React, useState } from 'react';
import './SearchBar.css';

function SearchBar({ onQuery }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onQuery();
  };

  return (
    <section className="searchbar">
      <form className="searchbar__form" role="search" onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          className="searchbar__input"
          aria-label="query"
          value={query}
          onChange={handleQueryChange}
          placeholder="Your Search to anywhere and everywhere..."
          minLength="2"
          maxLength="30"
          required
        />
        <button type="submit" className="searchbar__button">Go!</button>
      </form>
    </section>
  );
}

export default SearchBar;
