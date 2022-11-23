import { useState } from 'react';
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

// TODO: COMMIT IDENT AND IMPORT CHANGES, FIX INPUT VALIDATION, FIX API RENDERING, REVIEW, SEND //
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

  // LOCATIONS HANDLERS //
  const handleQuery = (locationName) => {
    setIsLoading(true);
    openTripApi
      .getLocations(locationName)
      .then((locationsArray) => {
        if (locationsArray.length > 0) {
          setLocations(locationsArray);
          setIsLoading(false);
          navigate('/locations');
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
    navigate('/saved-locations');
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
        onSubmit={handleRegistration}
      />
      <LoginFormPopup isOpen={isLoginFormOpen} onClose={handleClosePopups} onSubmit={handleLogin} />
      <LocationPopup location={selectedLocation} onClose={handleClosePopups} />
      <LoadingPopup isOpen={isLoading} />
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
