/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import './SearchBar.css';
import smallTriangle from '../../images/smallTriangle.svg';
import smallTriangleSelected from '../../images/smallTriangleSelected.svg';
import singleDownArrow from '../../images/singleDownArrow.svg';
import downArrow from '../../images/downArrow.png';

function SearchBar({ onQuery }) {
  // QUERY STATES //
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState('interesting_places');
  const [errorMessage, setErrorMessage] = useState('');

  // QUERY TYPE LIST DROPDOWN STATE AND EFFECT //
  const [isQueryListOpen, setIsQueryListOpen] = useState(false);

  useEffect(() => {
    if (!isQueryListOpen) return;

    const closeByKey = (e) => {
      if (e.key === ('Escape' || ' ')) {
        setIsQueryListOpen(false);
      }
    };

    document.addEventListener('keydown', closeByKey);

    return () => {
      document.removeEventListener('keydown', closeByKey);
    };
  }, [isQueryListOpen]);

  // QUERY CHANGE HANDLERS //
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQueryTypeChange = (e) => {
    setQueryType(e.target.value);
    setIsQueryListOpen(false);
  };

  // QUERY TYPE BUTTON CLICK HANDLER //
  const handleQueryListClick = () => {
    if (isQueryListOpen) {
      setIsQueryListOpen(false);
      return;
    }
    setIsQueryListOpen(true);
  };

  // VALIDATION HANDLER //
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

  // SUBMIT HANDLER //
  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidation().then((error) => {
      if (error.length === 0) {
        onQuery(query, queryType);
        setQuery('');
        setQueryType('interesting_places');
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
            autoComplete="off"
          />
          <button
            type="button"
            className="searchbar__query-button"
            onClick={handleQueryListClick}
            aria-label="search type"
          >
            Search type
            <img
              src={singleDownArrow}
              className={`searchbar__icon ${isQueryListOpen ? 'searchbar__icon_active' : ''} `}
              alt="list arrow"
            />
          </button>
          {isQueryListOpen && (
            <ul className="searchbar__list">
              <img
                src={
                  queryType === 'interesting_places'
                    ? `${smallTriangleSelected}`
                    : `${smallTriangle}`
                }
                className="searchbar__list-triangle"
                alt="list arrow"
              />
              <li
                className={`searchbar__list-item ${
                  queryType === 'interesting_places' ? 'searchbar__list-item_selected' : ''
                }`}
              >
                <label className="searchbar__label" htmlFor="querytype__all">
                  <input
                    type="radio"
                    name="querytype"
                    id="querytype__all"
                    className="searchbar__radio-button"
                    aria-label="all"
                    value="interesting_places"
                    onChange={handleQueryTypeChange}
                  />
                  All
                </label>
              </li>
              <li
                className={`searchbar__list-item ${
                  queryType === 'architecture' ? 'searchbar__list-item_selected' : ''
                }`}
              >
                <label className="searchbar__label" htmlFor="querytype__architecture">
                  <input
                    type="radio"
                    name="querytype"
                    id="querytype__architecture"
                    className="searchbar__radio-button"
                    aria-label="architecture"
                    value="architecture"
                    onChange={handleQueryTypeChange}
                  />
                  Architecture
                </label>
              </li>
              <li
                className={`searchbar__list-item ${
                  queryType === 'museums' ? 'searchbar__list-item_selected' : ''
                }`}
              >
                <label className="searchbar__label" htmlFor="querytype__museums">
                  <input
                    type="radio"
                    name="querytype"
                    id="querytype__museums"
                    className="searchbar__radio-button"
                    aria-label="museums"
                    value="museums"
                    onChange={handleQueryTypeChange}
                  />
                  Museums
                </label>
              </li>
              <li
                className={`searchbar__list-item ${
                  queryType === 'theatres_and_entertainment' ? 'searchbar__list-item_selected' : ''
                }`}
              >
                <label className="searchbar__label" htmlFor="querytype__theatres_and_entertainment">
                  <input
                    type="radio"
                    name="querytype"
                    id="querytype__theatres_and_entertainment"
                    className="searchbar__radio-button"
                    aria-label="theatres and entertainment"
                    value="theatres_and_entertainment"
                    onChange={handleQueryTypeChange}
                  />
                  Theaters and entertainment
                </label>
              </li>
              <li
                className={`searchbar__list-item ${
                  queryType === 'natural' ? 'searchbar__list-item_selected' : ''
                }`}
              >
                <label className="searchbar__label" htmlFor="querytype__natural">
                  <input
                    type="radio"
                    name="querytype"
                    id="querytype__natural"
                    className="searchbar__radio-button"
                    aria-label="natural locations"
                    value="natural"
                    onChange={handleQueryTypeChange}
                  />
                  Natural locations
                </label>
              </li>
              <li
                className={`searchbar__list-item ${
                  queryType === 'surfing' ? 'searchbar__list-item_selected' : ''
                }`}
              >
                <label className="searchbar__label" htmlFor="querytype__surfing">
                  <input
                    type="radio"
                    name="querytype"
                    id="querytype__surfing"
                    className="searchbar__radio-button"
                    aria-label="surfing spots"
                    value="surfing"
                    onChange={handleQueryTypeChange}
                  />
                  Surfing spots
                </label>
              </li>
              <li
                className={`searchbar__list-item ${
                  queryType === 'restaurants' ? 'searchbar__list-item_selected' : ''
                }`}
              >
                <label className="searchbar__label" htmlFor="querytype__restaurants">
                  <input
                    type="radio"
                    name="querytype"
                    id="querytype__restaurants"
                    className="searchbar__radio-button"
                    aria-label="restaurants"
                    value="restaurants"
                    onChange={handleQueryTypeChange}
                  />
                  Restaurants
                </label>
              </li>
            </ul>
          )}
          {errorMessage && <span className="searchbar__error">{errorMessage}</span>}
        </div>
        <button type="submit" className="searchbar__submit-button" aria-label="submit">
          Go!
        </button>
      </form>
      <a
        href="./#about"
        className={`searchbar__link ${errorMessage && 'searchbar__link_type_error'}`}
      >
        <img className="searchbar__arrow" src={downArrow} alt="down arrow link" />
      </a>
    </section>
  );
}

export default SearchBar;
