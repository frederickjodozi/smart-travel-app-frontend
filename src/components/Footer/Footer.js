import './Footer.css';
import '../../blocks/wrapper/wrapper.css';
import linkedInIcon from '../../images/linkedInIcon.svg';
import githubIcon from '../../images/githubIcon.svg';
import practicumIcon from '../../images/practicumIcon.ico';
import openTripMapIcon from '../../images/openTripMapIcon.png';

function Footer() {
  const date = new Date();

  return (
    <footer className="footer wrapper_type_small">
      <ul className="footer__list">
        <li className="footer__list-item">
          <img src={linkedInIcon} className="footer__link-icon" alt="LinkedIn" />
          <a
            href="https://www.linkedin.com/in/frederick-jodozi/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            My LinkedIn
          </a>
        </li>
        <li className="footer__list-item">
          <img src={githubIcon} className="footer__link-icon" alt="Github" />
          <a
            href="https://github.com/frederickjodozi"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            My GitHub
          </a>
        </li>
        <li className="footer__list-item">
          <img src={practicumIcon} className="footer__link-icon" alt="Practicum" />
          <a
            href="https://practicum.com/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Practicum
          </a>
        </li>
        <li className="footer__list-item">
          <img src={openTripMapIcon} className="footer__link-icon" alt="Open Trip Map Api" />
          <a
            href="https://opentripmap.io/product"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenTripMap API
          </a>
        </li>
      </ul>
      <p className="footer__copywrite">{`© ${date.getFullYear()} Smart Travel App`}</p>
    </footer>
  );
}

export default Footer;
