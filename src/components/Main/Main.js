import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import About from '../About/About';
import Locations from '../Locations/Locations';
import './Main.css';

function Main({ onQuery, locations }) {
  return (
    <main className="main">
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <h1 className="main__title">Travel Smart</h1>
              <h2 className="main__subtitle">
                Find amazing sightseeing locations from all over the world!
              </h2>
              <SearchBar onQuery={onQuery} />
              {/* <About /> */}
            </>
        )}
        />
        <Route
          path="/locations"
          element={(
            <>
              <h2 className="main__subtitle">
                Location results for your search:
              </h2>
              <Locations locations={locations} />
            </>
          )}
        />
      </Routes>
    </main>
  );
}

export default Main;
