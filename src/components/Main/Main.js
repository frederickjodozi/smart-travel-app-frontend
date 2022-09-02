import { React } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import About from '../About/About';
import './Main.css';

function Main() {
  return (
    <section className="main">
      <h1 className="main__title">Travel Smart</h1>
      <h2 className="main__subtitle">
        Find amazing sightseeing locations from all over the world!
      </h2>
      <SearchBar />
      <About />
    </section>
  );
}

export default Main;
