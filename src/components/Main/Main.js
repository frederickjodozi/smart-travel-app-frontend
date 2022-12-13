import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SearchBar from '../SearchBar/SearchBar';
import About from '../About/About';
import Locations from '../Locations/Locations';
import './Main.css';

function Main({
  onQuery,
  locations,
  onCardClick,
  onCardSave,
  isLoggedIn,
  savedLocations,
  onCardDelete
}) {
  return (
    <main className="main">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className="main__title">Travel Smart</h1>
              <h2 className="main__subtitle">
                Find amazing sightseeing locations from all over the world!
              </h2>
              <SearchBar onQuery={onQuery} />
              <About />
            </>
          }
        />
        <Route
          path="/locations"
          element={
            <ProtectedRoute routeAuth={locations}>
              <h2 className="main__subtitle">Location results for your search</h2>
              <span className="main__message">Click cards for more info</span>
              <Locations
                locations={locations}
                onCardClick={onCardClick}
                onCardSave={onCardSave}
                isLoggedIn={isLoggedIn}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-locations"
          element={
            <ProtectedRoute routeAuth={isLoggedIn}>
              <h2 className="main__subtitle">Your saved locations</h2>
              <Locations
                locations={savedLocations}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                isLoggedIn={isLoggedIn}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default Main;
