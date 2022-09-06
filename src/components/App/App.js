import { React, useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SignUpFormPopup from '../SignUpFormPopup/SignUpFormPopup';
import LoginFormPopup from '../LoginFormPopup/LoginFormPopup';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSignUpClick = () => {
    setIsSignUpFormOpen(true);
  };

  const handleLoginClick = () => {
    setIsLoginFormOpen(true);
  };

  const handleClosePopups = () => {
    setIsSignUpFormOpen(false);
    setIsLoginFormOpen(false);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log('Submitted!');
    handleClosePopups();
  };

  const handleQuery = () => {
    console.log('Searching!');
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onSignUpClick={handleSignUpClick}
        onLoginClick={handleLoginClick}
      />
      <Main onQuery={handleQuery} />
      <SignUpFormPopup
        isOpen={isSignUpFormOpen}
        onClose={handleClosePopups}
        onSubmit={handleRegistration}
      />
      <LoginFormPopup
        isOpen={isLoginFormOpen}
        onClose={handleClosePopups}
        onSubmit={handleRegistration}
      />
    </div>
  );
}

export default App;
