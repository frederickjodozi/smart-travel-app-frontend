/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './LocationCard.css';

function LocationCard({ location, onCardClick, onCardSave, isLoggedIn }) {
  const handleCardClick = () => {
    onCardClick(location);
  };

  return (
    <li className="location">
      {/* LOGIC TO BE IMPLEMENTED WITH BACKEND PART OF PROJECT
      {isLoggedIn && location.xid === user.cards.xid
        ? (
          <button
            className="location__save-button"
            type="button"
            onClick={onCardDelete}
            aria-label="Save Location"
          />
        ) : '' }
      */}
      {isLoggedIn ? (
        <button
          className="location__save-button"
          type="button"
          onClick={onCardSave}
          aria-label="Save Location"
        />
      ) : (
        ''
      )}
      <img
        className="location__image"
        src={`${location.preview.source}`}
        alt={`${location.name}`}
        onClick={handleCardClick}
      />
      <h2 className="location__title">{location.name}</h2>
    </li>
  );
}

export default LocationCard;
