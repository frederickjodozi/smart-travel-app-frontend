import { React } from 'react';
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
        <p className="locationpopup__text">{location ? location.wikipedia_extracts.text : ''}</p>
      </div>
    </Popup>
  );
}

export default LocationPopup;
