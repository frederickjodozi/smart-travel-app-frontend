import { useEffect, useState } from 'react';
import PopupForm from '../PopupForm/PopupForm';
import './SignUpFormPopup.css';

function SignUpFormPopup({ isOpen, onClose, onFormSwitch, onSubmit, signUpError }) {
  // STATE VARIABLES //
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('');
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  // HANDLE INPUT CHANGE, VALIDATION AND SUBMIT //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  async function handleValidation() {
    const errors = {};
    const validator = {
      email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      password: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/
    };

    if (!inputValues.name) {
      errors.name = 'Please enter a username';
    } else if (inputValues.name.length < 2) {
      errors.name = 'Please enter a username that has at least two characters';
    } else if (inputValues.name.length > 30) {
      errors.name = "Your username can't contain more than 30 characters";
    }

    if (!inputValues.email) {
      errors.email = 'Please enter an email address';
    } else if (!validator.email.test(inputValues.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!inputValues.password) {
      errors.password = 'Please enter a password';
    } else if (inputValues.password.length < 8) {
      errors.password = 'Your password must contain at least 8 alphanumeric characters';
    } else if (!validator.password.test(inputValues.password)) {
      errors.password =
        'Please enter at least one uppercase letter, one lowercase letter and one digit';
    } else if (inputValues.password.length > 30) {
      errors.password = 'Your password must contain no more than 30 characters';
    }

    setErrorMessages(errors);

    if (Object.keys(errors).length === 0) {
      setDisableSubmitButton(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValues);
    setInputValues({
      name: '',
      email: '',
      password: ''
    });
    setDisableSubmitButton(true);
  };

  // RESET INPUT VALUES ON FORM CLOSE //
  useEffect(() => {
    setInputValues({
      name: '',
      email: '',
      password: ''
    });

    setErrorMessages({});
    setSignUpErrorMessage('');
  }, [onClose]);

  // RUN VALIDATION WHEN INPUT VALUES CHANGES //
  useEffect(() => {
    if (
      inputValues.name.length > 0 ||
      inputValues.email.length > 0 ||
      inputValues.password.length > 0
    ) {
      handleValidation();
    }
  }, [inputValues]);

  // STORE SERVER ERROR MESSAGES IN STATE VARIABLE //
  useEffect(() => {
    setSignUpErrorMessage(signUpError);
  }, [signUpError]);

  return (
    <PopupForm
      isOpen={isOpen}
      onClose={onClose}
      onFormSwitch={onFormSwitch}
      onSubmit={handleSubmit}
      title="Sign Up"
      submitText="Create Profile"
      disableSubmitButton={disableSubmitButton}
      linkText="Log In"
    >
      <input
        type="text"
        name="name"
        id="signupform__name"
        className={`signupform__input ${errorMessages.name ? 'signupform__input-error' : ''}`}
        aria-label="name input"
        value={inputValues.name}
        onChange={handleInputChange}
        placeholder="Enter your username"
        autoComplete="off"
      />
      {errorMessages.name && <span className="signupform__error">{errorMessages.name}</span>}
      <input
        type="text"
        name="email"
        id="signupform__email"
        className={`signupform__input ${errorMessages.email ? 'signupform__input-error' : ''}`}
        aria-label="email input"
        value={inputValues.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        autoComplete="off"
      />
      {errorMessages.email && <span className="signupform__error">{errorMessages.email}</span>}
      <input
        type="text"
        name="password"
        id="signupform__password"
        className={`signupform__input ${errorMessages.password ? 'signupform__input-error' : ''}`}
        aria-label="password input"
        value={inputValues.password}
        onChange={handleInputChange}
        placeholder="Create a password"
        autoComplete="off"
      />
      {errorMessages.password && (
        <span className="signupform__error">{errorMessages.password}</span>
      )}
      {signUpErrorMessage && <span className="signupform__error">{signUpErrorMessage}</span>}
    </PopupForm>
  );
}

export default SignUpFormPopup;
