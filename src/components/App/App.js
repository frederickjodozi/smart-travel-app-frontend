/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
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
  const [locationToolTip, setLocationToolTip] = useState({
    locationName: '',
    locationHandler: ''
  });

  // POPUP STATES //
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [userApiErrors, setUserApiErrors] = useState({
    register: '',
    login: ''
  });

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

  // OPEN AND CLOSE POPUP HANDLERS //
  const handleSignUpClick = () => {
    setIsSignUpFormOpen(true);
  };

  const handleLoginClick = () => {
    setIsLoginFormOpen(true);
  };

  const handleCardClick = (location) => {
    setSelectedLocation(location);
  };

  const handleClosePopups = () => {
    setIsSignUpFormOpen(false);
    setIsLoginFormOpen(false);
    setSelectedLocation(null);
    setIsInfoTooltipOpen(false);
  };

  const handleSavedLocationsClick = () => {
    setLocationToolTip({
      locationName: '',
      locationHandler: ''
    });
  };

  // USER REGISTRATION AND LOGIN HANDLERS //
  const handleRegistration = (userData) => {
    setUserApiErrors({
      ...userApiErrors,
      register: ''
    })
    userApi
      .registerUser(userData)
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
        setUserApiErrors({
          ...userApiErrors,
          register: `${err.status}: ${err.statusText}`
        });
      });
  };

  const handleLogin = (userData) => {
    setUserApiErrors({
      ...userApiErrors,
      login: ''
    })
    userApi
      .loginUser(userData)
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
        setUserApiErrors({
          ...userApiErrors,
          login: `${err.status}: ${err.statusText}`
        });
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
          setLocationToolTip({
            locationName: '',
            locationHandler: ''
          });
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
      return userApi
        .createLocation(locationData, token)
        .then((savedLocation) => {
          setSavedLocations([savedLocation, ...savedLocations]);
          setLocationToolTip({
            locationName: savedLocation.title,
            locationHandler: 'saved'
          });
          return savedLocation;
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCardDelete = (locationId) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      userApi
        .deleteLocation(locationId, token)
        .then((deletedLocation) => {
          setSavedLocations((savedLocationsArray) =>
            savedLocationsArray.filter((savedLocation) => savedLocation._id !== locationId)
          );
          setLocationToolTip({
            locationName: deletedLocation.title,
            locationHandler: 'deleted'
          });
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
            onSavedLocationsClick={handleSavedLocationsClick}
          />
          <Main
            isLoggedIn={isLoggedIn}
            onQuery={handleQuery}
            locations={locations}
            savedLocations={savedLocations}
            onCardClick={handleCardClick}
            onCardSave={handleCardSave}
            onCardDelete={handleCardDelete}
            locationToolTip={locationToolTip}
            setIsLoginFormOpen={setIsLoginFormOpen}
          />
        </div>
        <Footer />
        <SignUpFormPopup
          isOpen={isSignUpFormOpen}
          onClose={handleClosePopups}
          onFormSwitch={handleLoginClick}
          onSubmit={handleRegistration}
          userApiError={userApiErrors.register}
        />
        <LoginFormPopup
          isOpen={isLoginFormOpen}
          onClose={handleClosePopups}
          onFormSwitch={handleSignUpClick}
          onSubmit={handleLogin}
          userApiError={userApiErrors.login}
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
