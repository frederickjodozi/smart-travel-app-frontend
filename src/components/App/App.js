import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as openTripApi from '../../utils/openTripApi';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SignUpFormPopup from '../SignUpFormPopup/SignUpFormPopup';
import LoginFormPopup from '../LoginFormPopup/LoginFormPopup';
import LocationPopup from '../LocationPopup/LocationPopup';
import LoadingPopup from '../LoadingPopup/LoadingPopup';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import Footer from '../Footer/Footer';
import './App.css';
import '../../blocks/background/background.css';

function App() {
  const navigate = useNavigate();

  // LOGIN STATES //
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // UI RENDERED LOCATIONS STATES //
  const [locations, setLocations] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);

  // POPUP STATES //
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState('');
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');

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

  // CLOSE POPUP HANDLER //
  const handleClosePopups = () => {
    setIsSignUpFormOpen(false);
    setIsLoginFormOpen(false);
    setSelectedLocation(null);
    setIsInfoTooltipOpen(false);
  };

  // USER REGISTRATION AND LOGIN HANDLERS //
  const handleRegistration = () => {
    // REGISTRATION LOGIC TO BE ADDED WITH BACKEND PART OF THE PROJECT //
    handleClosePopups();
  };

  const handleLogin = () => {
    // LOGIN LOGIC TO BE ADDED WITH BACKEND PART OF THE PROJECT //
    handleClosePopups();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // TODO: CHANGE CARDS DISPLAY, CHECK FOR VALIDATION? / GIT PULL

  // LOCATIONS HANDLERS //
  const handleQuery = (locationName) => {
    setIsLoading(true);
    openTripApi.getLocationCoordinates(locationName)
      .then((locationCoordinates) => openTripApi.createLocationRadius(locationCoordinates))
      .then((locationRadius) => openTripApi.getLocationsInfo(locationRadius))
      .then((locationsArray) => {
        setLocations(locationsArray);
        setIsLoading(false);
        navigate('/locations');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setInfoTooltipStatus('fail');
        setInfoTooltipMessage('No locations matching this query have been found.');
        setIsInfoTooltipOpen(true);
      });
  };

  const handleCardSave = (location) => {
    // LOGIN LOGIC TO BE ADDED WITH BACKEND PART OF THE PROJECT //
    setSavedLocations([...savedLocations, location]);
    navigate('/saved-locations');
  };

  const handleCardDelete = (locationXid) => {
    // LOGIN LOGIC TO BE ADDED WITH BACKEND PART OF THE PROJECT //
    setSavedLocations((savedLocationsArray) => savedLocationsArray.filter(
      (savedLocation) => savedLocation.xid === locationXid
    ));
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
      <LoadingPopup
        isOpen={isLoading}
      />
      <InfoToolTip
        isOpen={isInfoTooltipOpen}
        onClose={handleClosePopups}
        status={infoTooltipStatus}
        message={infoTooltipMessage}
      />
    </div>
  );
}

export default App;
