import Popup from '../Popup/Popup';
import './PopupForm.css';

function PopupForm({
  isOpen,
  onClose,
  onFormSwitch,
  title,
  onSubmit,
  children,
  disableSubmitButton,
  submitText,
  linkText
}) {
  const handleFormSwitch = () => {
    onClose();
    onFormSwitch();
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__box">
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="popup__submit-button"
            disabled={disableSubmitButton}
            aria-label="submit"
          >
            {submitText}
          </button>
        </form>
        <button type="button" className="popup__switch-button" onClick={handleFormSwitch}>
          {linkText}
        </button>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
          aria-label="close popup"
        />
      </div>
    </Popup>
  );
}

export default PopupForm;
