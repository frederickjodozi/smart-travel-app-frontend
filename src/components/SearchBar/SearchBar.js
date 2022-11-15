import { React, useState } from 'react';
import './SearchBar.css';
import downArrow from '../../images/downArrow.png';

function SearchBar({ onQuery }) {
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  function handleValidation() {
    if (!query) {
      setErrorMessage('Please fill out the query');
      return false;
    }

    if (query.length < 3) {
      setErrorMessage('The query must contain at least 3 characters');
      return false;
    }

    if (query.length > 30) {
      setErrorMessage('The query must contain no more than 30 characters');
      return false;
    }

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation() === true) {
      onQuery(query);
      setErrorMessage('');
    }
  };

  return (
    <section className="searchbar">
      <form className="searchbar__form" role="search" onSubmit={handleSubmit}>
        <div className="searchbar__input-container">
          <input
            type="text"
            id="search"
            className="searchbar__input"
            aria-label="query"
            value={query}
            onChange={handleQueryChange}
            placeholder="Your Search to anywhere..."
          />
          {errorMessage && <span className="searchbar__error">{errorMessage}</span>}
        </div>
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
