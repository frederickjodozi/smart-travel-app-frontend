import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserContext from '../../contexts/CurrentUserContext';
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
  locationToolTip,
  setIsLoginFormOpen
}) {
  const currentUser = useContext(UserContext);
  const [uniqueCountries, setUniqueCountries] = useState(0);

  const countSavedCountries = (savedLocationCards) => {
    const savedCountries = {};

    savedLocationCards.forEach((savedLocationCard) => {
      const uniqueCountry = savedLocationCard.country;
      if (!savedCountries[uniqueCountry]) {
        savedCountries[uniqueCountry] = true;
      }
    });

    setUniqueCountries(Object.keys(savedCountries).length);
  };

  useEffect(() => {
    countSavedCountries(savedLocations);
  }, [savedLocations]);

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
            <>
              <span className="main__localtiontooltip">
                {locationToolTip.locationName.length > 0
                  ? `Location "${locationToolTip.locationName}" has been ${locationToolTip.locationHandler}!`
                  : ''}
              </span>
              <h2 className="main__subtitle">Location results for your search</h2>
              <span className="main__message">Click cards for more info</span>
              <Locations
                isLoggedIn={isLoggedIn}
                locations={locations}
                onCardClick={onCardClick}
                onCardSave={onCardSave}
                onCardDelete={onCardDelete}
              />
            </>
          }
        />
        <Route
          path="/smart-travel-app-frontend/saved-locations"
          element={
            <ProtectedRoute routeAuth={isLoggedIn} setIsLoginFormOpen={setIsLoginFormOpen}>
              {savedLocations.length === 0 ? (
                <h2 className="main__subtitle main__subtitle_nolocations">
                  No saved locations to show
                </h2>
              ) : (
                <>
                  <span className="main__locationtooltip main__locationtooltip_handler">
                    {locationToolTip.locationName.length > 0
                      ? `Location "${locationToolTip.locationName}" has been ${locationToolTip.locationHandler}!`
                      : ''}
                  </span>
                  <h2 className="main__subtitle">Your saved locations</h2>
                  <span className="main__locationtooltip main__locationtooltip_info">{`${currentUser.name}, you have ${savedLocations.length} saved locations from ${uniqueCountries} different countries:`}</span>
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
