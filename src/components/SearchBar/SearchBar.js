import { React, useState } from 'react';
import './SearchBar.css';
import downArrow from '../../images/downArrow.png';

function SearchBar({ onQuery }) {
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  async function handleValidation() {
    let error = '';

    if (!query) {
      error = 'Please fill out the query';
    } else if (query.length < 3) {
      error = 'The query must contain at least 3 characters';
    } else if (query.length > 30) {
      error = 'The query must contain no more than 30 characters';
    }

    return error;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidation().then((error) => {
      if (error.length === 0) {
        onQuery(query);
        setQuery('');
      } else {
        setErrorMessage(error);
      }
    });
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
      <a href="./#about" className={`searchbar__link ${errorMessage && 'searchbar__link_type_error'}`}>
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
