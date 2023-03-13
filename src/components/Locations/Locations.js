import { useState } from 'react';
import LocationCard from '../LocationCard/LocationCard';
import './Locations.css';

function Locations({
  isLoggedIn,
  locations,
  onCardClick,
  onCardSave,
  onCardDelete
}) {
  const [visible, setVisible] = useState(3);

  const handleShowMoreClick = () => {
    setVisible(visible + 3);
  };

  return (
    <section className="locations">
      <ul className="locations__list">
        {/* LOCATION._ID IS USED BY SAVED LOCATIONS AND LOCATION.XID BY API RETURNED LOCATIONS */}
        {locations.every((location) => location._id )
          ? locations
              .slice(0, visible)
              .map((location) => (
                <LocationCard
                  key={location._id}
                  isLoggedIn={isLoggedIn}
                  location={location}
                  onCardClick={onCardClick}
                  onCardDelete={onCardDelete}
                />
              ))
          : locations
              .slice(0, visible)
              .map((location) => (
                <LocationCard
                  key={location.xid}
                  isLoggedIn={isLoggedIn}
                  location={location}
                  onCardClick={onCardClick}
                  onCardSave={onCardSave}
                />
              ))}
      </ul>
      {locations.length > visible ? (
        <button type="button" className="locations__button" onClick={handleShowMoreClick}>
          Show more
        </button>
      ) : (
        ''
      )}
    </section>
  );
}

export default Locations;
