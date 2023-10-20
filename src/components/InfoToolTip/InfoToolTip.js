import Popup from '../Popup/Popup';
import './InfoToolTip.css';
import errorLogo from '../../images/error-icon.svg';
import successLogo from '../../images/success-icon.svg';

function InfoToolTip({ isOpen, onClose, status, message, onFormSwitch }) {
  const handleFormSwitch = () => {
    onClose();
    onFormSwitch();
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="infotooltip__box">
        {status === 'success' ? (
          <>
            <img src={successLogo} className="infotooltip__logo" alt="success" />
            <h3 className="infotooltip__title">Success!</h3>
            <p className="infotooltip__message">{message}</p>
            {message === 'Registration successful!' ? (
              <button type="button" className="infotooltip__switch-button" onClick={handleFormSwitch}>
                Go to Login form
              </button>
            ) : (
              ''
            )}
          </>
        ) : (
          <>
            <img src={errorLogo} className="infotooltip__logo" alt="error" />
            <h3 className="infotooltip__title">Error!</h3>
            <p className="infotooltip__message">{message}</p>
          </>
        )}
        <button type="button" className="infotooltip__button" onClick={onClose} aria-label="ok">
          Ok
        </button>
        <button
          type="button"
          className="infotooltip__close-button"
          onClick={onClose}
          aria-label="close popup"
        />
      </div>
    </Popup>
  );
}

export default InfoToolTip;
