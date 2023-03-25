import { useEffect, useState } from 'react';
import PopupForm from '../PopupForm/PopupForm';
import './LoginFormPopup.css';

function LoginFormPopup({ isOpen, onClose, onFormSwitch, onSubmit, logInError }) {
  // KEEP THE INPUT ERROR ALWAYS ON WITH A HEIGHT: DISPLAY FLEX, JUSTIFY CENTER AND THE MESSAGE APPEARS ON ERROR //
  // STATE VARIABLES //
  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  const [showValidationErrors, setShowValidationErrors] = useState({
    email: false,
    password: false
  });

  const [serverError, setServerError] = useState('');
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  // HANDLE INPUT CHANGE, HANDLE FOCUSED INPUT AND HANDLE BLURRED INPUT //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const handleInputFocus = (e) => {
    const { name } = e.target;

    const unfocusedInputs = Object.fromEntries(
      Object.entries(inputValues).filter(([key]) => key !== name)
    );
    const unfocusedValidationErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([key]) => key !== name)
    );

    /* SHOW VALIDATION ERROR FOR LAST FIELD TO BE FILLED:
    HELP USER UNDERSTAND WHY THE VALIDATION BUTTON IS STILL DISABLED */
    if (
      Object.values(unfocusedInputs).every((unfocusedInput) => unfocusedInput.length > 0) &&
      Object.values(unfocusedValidationErrors).every(
        (unfocusedValidationError) => unfocusedValidationError.length < 1
      )
    ) {
      setShowValidationErrors({
        ...showValidationErrors,
        [name]: true
      });
    }
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;

    if (inputValues[name].length === 0) {
      return;
    }
    setShowValidationErrors({
      ...showValidationErrors,
      [name]: true
    });
  };

  // HANDLE VALIDATION AND RUN VALIDATION ON INPUT CHANGE //
  const handleValidation = () => {
    const errors = {
      email: '',
      password: ''
    };

    const validator = {
      email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      password: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/
    };

    if (!inputValues.email) {
      errors.email = 'Please enter your email address';
    } else if (!validator.email.test(inputValues.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!inputValues.password) {
      errors.password = 'Please enter your password';
    } else if (inputValues.password.length < 8) {
      errors.password = 'Registered passwords contain at least 8 alphanumeric characters';
    } else if (!validator.password.test(inputValues.password)) {
      errors.password =
        'Registered passwords contain upper and lowercase letters and a at least one digit';
    } else if (inputValues.password.length > 30) {
      errors.password = 'Registered passwords contain no more than 30 characters';
    }

    setValidationErrors(errors);
    if (Object.values(errors).every((error) => error === '')) {
      setDisableSubmitButton(false);
    } else {
      setDisableSubmitButton(true);
    }
  };

  useEffect(() => {
    if (Object.values(inputValues).some((inputValue) => inputValue.length > 0)) {
      handleValidation();
    }
  }, [inputValues]);

  // HANDLE SUBMIT AND RESET INPUT VALUES ON FORM CLOSE //
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValues);
    setInputValues({
      email: '',
      password: ''
    });

    setValidationErrors({
      email: '',
      password: ''
    });

    setShowValidationErrors({
      email: false,
      password: false
    });

    setServerError('');
    setDisableSubmitButton(true);
  };

  useEffect(() => {
    setServerError(logInError);
  }, [logInError]);

  useEffect(() => {
    setInputValues({
      email: '',
      password: ''
    });

    setValidationErrors({
      email: '',
      password: ''
    });

    setShowValidationErrors({
      email: false,
      password: false
    });

    setServerError('');
    setDisableSubmitButton(true);
  }, [onClose]);

  return (
    <PopupForm
      isOpen={isOpen}
      onClose={onClose}
      onFormSwitch={onFormSwitch}
      onSubmit={handleSubmit}
      title="Log In"
      submitText="Log in"
      disableSubmitButton={disableSubmitButton}
      linkText="Sign In"
    >
      <input
        type="text"
        name="email"
        id="email"
        className="loginform__input"
        aria-label="email input"
        value={inputValues.email}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Enter your email"
        autoComplete="off"
      />
      <span className="loginform__error">
        {showValidationErrors.email && inputValues.email.length > 0 ? validationErrors.email : ''}
      </span>
      <input
        type="text"
        name="password"
        id="password"
        className="loginform__input"
        aria-label="password input"
        value={inputValues.password}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Enter your password"
        autoComplete="off"
      />
      <span className="loginform__error">
        {showValidationErrors.password && inputValues.password.length > 0 ? validationErrors.password : ''}
      </span>
      {serverError && <span className="loginform__error">{serverError}</span>}
    </PopupForm>
  );
}

export default LoginFormPopup;
