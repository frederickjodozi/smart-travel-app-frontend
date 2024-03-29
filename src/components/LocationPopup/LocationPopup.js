import Popup from '../Popup/Popup';
import './LocationPopup.css';

function LocationPopup({ location, onClose }) {
  return (
    <Popup location={location} onClose={onClose}>
      <div className="locationpopup">
        <button
          className="locationpopup__close-button"
          type="button"
          onClick={onClose}
          aria-label="close popup"
        />
        {/* LOCATION._ID IS USED BY SAVED LOCATIONS AND LOCATION.XID BY API RETURNED LOCATIONS */}
        {location ? (
          <p className="locationpopup__text">
            {location._id ? `${location.text}` : `${location.wikipedia_extracts.text}`}
          </p>
        ) : (
          ''
        )}
      </div>
    </Popup>
  );
}

export default LocationPopup;
