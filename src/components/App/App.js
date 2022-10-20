import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as openTripApi from '../../utils/openTripApi';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SignUpFormPopup from '../SignUpFormPopup/SignUpFormPopup';
import LoginFormPopup from '../LoginFormPopup/LoginFormPopup';
import LocationPopup from '../LocationPopup/LocationPopup';
import Footer from '../Footer/Footer';
import './App.css';
import '../../blocks/background/background.css';

function App() {
  const navigate = useNavigate();

  // LOGIN STATE //
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // LOCATIONS TO BE RENDERED IN UI STATES //
  const [locations, setLocations] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);

  // POPUP STATES //
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // CLOSE POPUP HANDLER //
  const handleClosePopups = () => {
    setIsSignUpFormOpen(false);
    setIsLoginFormOpen(false);
    setSelectedLocation(null);
  };

  // USER REGISTRATION AND LOGIN HANDLERS //
  const handleRegistration = (e) => {
    e.preventDefault();
    // REGISTRATION LOGIC TO BE ADDED WITH BACKEND PART OF THE PROJECT //
    handleClosePopups();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // LOGIN LOGIC TO BE ADDED WITH BACKEND PART OF THE PROJECT //
    handleClosePopups();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // RENDER LOCATIONS HANDLERS //
  const handleQuery = (locationName) => {
    openTripApi.getLocationCoordinates(locationName)
      .then((locationCoordinates) => openTripApi.createLocationRadius(locationCoordinates))
      .then((result) => openTripApi.getLocationsInfo(result))
      .then((result) => {
        setLocations(result);
        navigate('/locations');
      })
      .catch((err) => console.log(err));
  };

  const handleCardSave = (location) => {
    setSavedLocations([...savedLocations, location]);
    navigate('/saved-locations');
  };

  const handleCardDelete = (locationXid) => {
    setSavedLocations((savedLocationsArray) => savedLocationsArray.filter(
      (savedLocation) => savedLocation.xid === locationXid
    ));
  };

  // OPEN POPUP HANDLERS //
  const handleSignUpClick = () => {
    setIsSignUpFormOpen(true);
  };

  const handleLoginClick = () => {
    setIsLoginFormOpen(true);
  };

  const handleCardClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="app">
      <div className="background">
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onSignUpClick={handleSignUpClick}
          onLoginClick={handleLoginClick}
        />
        <Main
          onQuery={handleQuery}
          locations={locations}
          onCardClick={handleCardClick}
          onCardSave={handleCardSave}
          isLoggedIn={isLoggedIn}
          savedLocations={savedLocations}
          onCardDelete={handleCardDelete}
        />
      </div>
      <Footer />
      <SignUpFormPopup
        isOpen={isSignUpFormOpen}
        onClose={handleClosePopups}
        onSubmit={handleRegistration}
      />
      <LoginFormPopup
        isOpen={isLoginFormOpen}
        onClose={handleClosePopups}
        onSubmit={handleLogin}
      />
      <LocationPopup
        location={selectedLocation}
        onClose={handleClosePopups}
      />
    </div>
  );
}

export default App;
