import { React, useState } from 'react';
import './SearchBar.css';
import downArrow from '../../images/downArrow.png';

function SearchBar({ onQuery }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onQuery(query);
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
          placeholder="Your Search to anywhere..."
          minLength="2"
          maxLength="30"
          required
        />
        <button type="submit" className="searchbar__button" aria-label="submit">
          Go!
        </button>
      </form>
      <a href="./#about" className="searchbar__link">
        <img
          className="searchbar__arrow"
          src={downArrow}
          alt="down arrow link"
        />
      </a>
    </section>
  );
}

export default SearchBar;
