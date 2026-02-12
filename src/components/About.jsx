import { Container, Row, Col } from 'react-bootstrap';
import { FiAward, FiHome, FiShield } from 'react-icons/fi';
import './About.css';

const VALUE_PROPS = [
  {
    icon: <FiAward />,
    title: 'Exceptional Craftsmanship',
    description:
      'Every detail is executed with precision and care, ensuring your home meets the highest standards of quality.',
  },
  {
    icon: <FiHome />,
    title: 'Thoughtful Design',
    description:
      'We blend architectural vision with practical, long-lasting solutions that reflect your unique lifestyle.',
  },
  {
    icon: <FiShield />,
    title: 'Built to Last',
    description:
      'Using premium materials and proven methods, we create homes that stand the test of time.',
  },
];

function About() {
  return (
    <section id="about" className="about-section section-padding bg-cream">
      <Container>
        <div className="fade-in-section">
          <div className="section-header">
            <h2>About Westwood Homes</h2>
            <p>
              Bellevue-based custom home builder dedicated to exceptional
              craftsmanship and thoughtful design.
            </p>
          </div>
        </div>

        <Row className="align-items-center about-main-row">
          <Col lg={6} className="fade-in-section">
            <div className="about-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                alt="Modern home interior by Westwood Homes"
                className="about-image"
              />
              <div className="about-image-accent" />
            </div>
          </Col>
          <Col lg={6} className="fade-in-section">
            <div className="about-text">
              <h3>Creating Spaces That Feel Personal and Intentional</h3>
              <p>
                Westwood Homes is a Bellevue-based custom home builder dedicated
                to exceptional craftsmanship and thoughtful design. With deep
                experience in residential construction, our team blends
                architectural vision with practical, long-lasting solutions.
              </p>
              <p>
                As a comprehensive design–build builder, we streamline the
                entire process — from initial planning and architecture to
                selections, interiors, and final delivery. Our mission is to
                turn ideas into homes, creating spaces that feel personal,
                intentional, and built to stand the test of time.
              </p>
              <a href="#contact" className="btn-primary-custom about-cta">
                Learn More
              </a>
            </div>
          </Col>
        </Row>

        <Row className="value-props-row">
          {VALUE_PROPS.map((prop, index) => (
            <Col md={4} key={index} className="fade-in-section">
              <div className="value-card">
                <div className="value-icon">{prop.icon}</div>
                <h4>{prop.title}</h4>
                <p>{prop.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default About;
