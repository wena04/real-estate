import { Container } from 'react-bootstrap';
import './Hero.css';

function Hero() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay" />
      <Container className="hero-content">
        <p className="hero-tagline">Bellevue-Based Custom Home Builder</p>
        <h1 className="hero-heading">
          Built Local. Built With Care.
          <br />
          <span className="hero-heading-accent">Built to Last.</span>
        </h1>
        <p className="hero-subtitle">
          Creating places where life unfolds — with exceptional craftsmanship
          and thoughtful design that stands the test of time.
        </p>
        <div className="hero-buttons">
          <a
            href="#portfolio"
            className="btn-primary-custom"
            onClick={(e) => handleScroll(e, '#portfolio')}
          >
            View Our Work
          </a>
          <a
            href="#contact"
            className="btn-outline-custom"
            onClick={(e) => handleScroll(e, '#contact')}
          >
            Get In Touch
          </a>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
