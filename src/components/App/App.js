/* eslint-disable no-undef */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as openTripApi from '../../utils/openTripApi';
import userApi from '../../utils/userApi';
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
  const [signUpError, setSignUpError] = useState('');
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState('');
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');

  // LOCATIONS CALL ON PAGE LOAD //
  useEffect(() => {
    const storedLocations = localStorage.getItem('locations');
    if (storedLocations) {
      setLocations(JSON.parse(storedLocations));
      navigate('/smart-travel-app-frontend/locations');
    }
  }, []);

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
  const handleRegistration = ({ email, password, name }) => {
    userApi.registerUser({ email, password, name })
      .then((res) => {
        if (res._id) {
          handleClosePopups();
          setInfoTooltipStatus('success');
          setInfoTooltipMessage('Registration successful!')
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSignUpError(`${err.status}: ${err.statusText}`);
      });
  };

  const handleLogin = () => {
    // LOGIN LOGIC TO BE ADDED WITH BACKEND PART OF THE PROJECT //
    handleClosePopups();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // LOCATIONS HANDLERS //
  const handleQuery = (locationName, locationType) => {
    setIsLoading(true);
    openTripApi
      .getLocations(locationName, locationType)
      .then((locationsArray) => {
        if (locationsArray.length > 0) {
          localStorage.setItem('locations', JSON.stringify(locationsArray));
          setLocations(locationsArray);
          setIsLoading(false);
          navigate('/smart-travel-app-frontend/locations');
        } else {
          setInfoTooltipStatus('fail');
          setInfoTooltipMessage('No location was found');
          setIsLoading(false);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipStatus('fail');
        setInfoTooltipMessage(
          `${
            err.status === (400 || 404)
              ? 'No location was found'
              : 'A problem occurred with the server'
          }`
        );
        setIsLoading(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleCardSave = (location) => {
    // LOGIN LOGIC TO BE ADDED WITH BACKEND PART OF THE PROJECT //
    setSavedLocations([...savedLocations, location]);
    navigate('/smart-travel-app-frontend/saved-locations');
  };

  const handleCardDelete = (locationXid) => {
    // LOGIN LOGIC TO BE ADDED WITH BACKEND PART OF THE PROJECT //
    setSavedLocations((savedLocationsArray) =>
      savedLocationsArray.filter((savedLocation) => savedLocation.xid === locationXid)
    );
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
        onFormSwitch={handleLoginClick}
        onSubmit={handleRegistration}
        signUpError={signUpError}
      />
      <LoginFormPopup isOpen={isLoginFormOpen} onClose={handleClosePopups} onFormSwitch={handleSignUpClick} onSubmit={handleLogin} />
      <LocationPopup location={selectedLocation} onClose={handleClosePopups} />
      <LoadingPopup isOpen={isLoading} />
      <InfoToolTip
        isOpen={isInfoTooltipOpen}
        onClose={handleClosePopups}
        status={infoTooltipStatus}
        message={infoTooltipMessage}
        onFormSwitch={handleLoginClick}
      />
    </div>
  );
}

export default App;
