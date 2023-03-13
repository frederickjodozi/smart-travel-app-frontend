/* eslint-disable no-undef */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/CurrentUserContext';
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
  const [currentUser, setCurrentUser] = useState({});

  // UI RENDERED LOCATIONS STATES //
  const [locations, setLocations] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);

  // POPUP STATES //
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [logInError, setLogInError] = useState('');

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState('');
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // TOKEN CHECK ON APP RENDER //
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      userApi
        .getUserInfo(token)
        .then((returnedUser) => {
          setIsLoggedIn(true);
          console.log(returnedUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // USER INFO CALL ON LOGIN //
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      userApi
        .getUserInfo(token)
        .then((returnedUser) => {
          setCurrentUser(returnedUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  // SAVED LOCATIONS CALL ON LOGIN //
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      userApi
        .getUserLocations(token)
        .then((returnedLocations) => {
          setSavedLocations(returnedLocations);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

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
    userApi
      .registerUser({ email, password, name })
      .then((res) => {
        if (res._id) {
          handleClosePopups();
          navigate('/smart-travel-app-frontend');
          setInfoTooltipStatus('success');
          setInfoTooltipMessage('Registration successful!');
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSignUpError(`${err.status}: ${err.statusText}`);
      });
  };

  const handleLogin = ({ email, password }) => {
    userApi
      .loginUser({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          handleClosePopups();
          navigate('/smart-travel-app-frontend');
        }
      })
      .catch((err) => {
        console.log(err);
        setLogInError(`${err.status}: ${err.statusText}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/smart-travel-app-frontend');
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

  const handleCardSave = (locationData) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      userApi
        .createLocation(locationData, token)
        .then((savedLocation) => {
          setSavedLocations([savedLocation, ...savedLocations]);
          navigate('/smart-travel-app-frontend/saved-locations');
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCardDelete = (locationId) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      userApi
        .deleteLocation(locationId, token)
        .then(() => {
          setSavedLocations((savedLocationsArray) =>
            savedLocationsArray.filter((savedLocation) => savedLocation._id !== locationId)
          );
          navigate('/smart-travel-app-frontend/saved-locations');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <UserContext.Provider value={currentUser}>
      <div className="app">
        <div className="background">
          <Header
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            onSignUpClick={handleSignUpClick}
            onLoginClick={handleLoginClick}
          />
          <Main
            isLoggedIn={isLoggedIn}
            onQuery={handleQuery}
            locations={locations}
            savedLocations={savedLocations}
            onCardClick={handleCardClick}
            onCardSave={handleCardSave}
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
        <LoginFormPopup
          isOpen={isLoginFormOpen}
          onClose={handleClosePopups}
          onFormSwitch={handleSignUpClick}
          onSubmit={handleLogin}
          logInError={logInError}
        />
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
    </UserContext.Provider>
  );
}

export default App;
