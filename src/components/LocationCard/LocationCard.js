/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import './LocationCard.css';

function LocationCard({ isLoggedIn, location, onCardClick, onCardSave, onCardDelete }) {
  const [cardSaved, setCardSaved] = useState(false);
  const [savedCardId, setSavedCardId] = useState('');

  const handleCardClick = () => {
    onCardClick(location);
  };

  const handleCardSave = () => {
    if (cardSaved === false) {
      onCardSave({
        title: location.name,
        text: location.wikipedia_extracts.text,
        image: location.preview.source
      }).then((savedLocation) => {
        setCardSaved(true);
        setSavedCardId(savedLocation._id);
      });
    } else {
      onCardDelete(savedCardId);
      setCardSaved(false);
    }
  };

  const handleCardDelete = () => {
    onCardDelete(location._id);
  };

  return (
    <li className="location">
      {/* LOCATION._ID IS USED BY SAVED LOCATIONS AND LOCATION.XID BY API RETURNED LOCATIONS */}
      {isLoggedIn && location._id ? (
        <button
          className="location__save-button location__save-button_saved"
          type="button"
          onClick={handleCardDelete}
          aria-label="Delete Location"
        />
      ) : (
        ''
      )}
      {isLoggedIn && location.xid ? (
        <button
          className={
            cardSaved
              ? `location__save-button location__save-button_saved`
              : 'location__save-button'
          }
          type="button"
          onClick={handleCardSave}
          aria-label="Save Location"
        />
      ) : (
        ''
      )}
      <img
        className="location__image"
        src={location._id ? `${location.image}` : `${location.preview.source}`}
        alt={location._id ? `${location.title}` : `${location.name}`}
        onClick={handleCardClick}
      />
      <h2 className="location__title">{location._id ? `${location.title}` : `${location.name}`}</h2>
    </li>
  );
}

export default LocationCard;
