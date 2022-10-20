import { React } from 'react';
import LocationCard from '../LocationCard/LocationCard';
import './Locations.css';

function Locations({
  locations, onCardClick, onCardSave, onCardDelete, isLoggedIn
}) {
  return (
    <section className="locations">
      <ul className="locations__list">
        {locations.map((location) => (
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
    </section>
  );
}

export default Locations;
