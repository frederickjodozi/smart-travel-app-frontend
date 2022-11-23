import './About.css';
import '../../blocks/wrapper/wrapper.css';
import authorPicture from '../../images/authorPicture.jpg';

function About() {
  return (
    <section className="about" id="about">
      <h2 className="about__title">About me</h2>
      <div className="about__info wrapper_type_large">
        <img
          src={authorPicture}
          className="about__image"
          aria-label="The author"
        />
        <div className="about__paragraphs">
          <p className="about__paragraph">
            Hey there! I&#39;m Frederick Jodozi. I just graduated in web
            development with Practicum and am very excited about starting a new
            chapter of my life in tech.
          </p>
          <p className="about__paragraph">
            I would like to thank the Practicum team for helping me getting
            started on this journey. Their curriculum has helped me learn the
            technologies necessary to build this app and the tutoring team has
            been nothing but supportive and dedicated to my learning.
          </p>
          <p className="about__paragraph">
            This App consists of my final project for the program and is my
            first self-directed one. It is connected to a third party API and
            renders information about sightseeing locations upon query. I hope
            you enjoy it ;)
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
