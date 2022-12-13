import { useState } from 'react';
import LocationCard from '../LocationCard/LocationCard';
import './Locations.css';

function Locations({ locations, onCardClick, onCardSave, onCardDelete, isLoggedIn }) {
  const [visible, setVisible] = useState(3);

  const handleShowMoreClick = () => {
    setVisible(visible + 3);
  };

  return (
    <section className="locations">
      <ul className="locations__list">
        {locations.slice(0, visible).map((location) => (
          <LocationCard
            key={location.xid}
            location={location}
            onCardClick={onCardClick}
            onCardSave={onCardSave}
            onCardDelete={onCardDelete}
            isLoggedIn={isLoggedIn}
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
