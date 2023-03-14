import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SearchBar from '../SearchBar/SearchBar';
import About from '../About/About';
import Locations from '../Locations/Locations';
import './Main.css';

function Main({
  isLoggedIn,
  onQuery,
  locations,
  savedLocations,
  onCardClick,
  onCardSave,
  onCardDelete,
  setIsLoginFormOpen
}) {
  return (
    <main className="main">
      <Routes>
        <Route
          path="/smart-travel-app-frontend"
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
          path="/smart-travel-app-frontend/locations"
          element={
            <ProtectedRoute routeAuth={isLoggedIn} setIsLoginFormOpen={setIsLoginFormOpen}>
              <h2 className="main__subtitle">Location results for your search</h2>
              <span className="main__message">Click cards for more info</span>
              <Locations
                isLoggedIn={isLoggedIn}
                locations={locations}
                onCardClick={onCardClick}
                onCardSave={onCardSave}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/smart-travel-app-frontend/saved-locations"
          element={
            <ProtectedRoute routeAuth={isLoggedIn} setIsLoginFormOpen={setIsLoginFormOpen}>
              {savedLocations.length === 0 ? (
                <h2 className="main__subtitle main__subtitle_nolocations">No saved locations to show</h2>
              ) : (
                <>
                  <h2 className="main__subtitle">Your saved locations</h2>
                  <Locations
                    isLoggedIn={isLoggedIn}
                    locations={savedLocations}
                    onCardClick={onCardClick}
                    onCardDelete={onCardDelete}
                  />
                </>
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default Main;
