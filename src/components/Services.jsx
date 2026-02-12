import { Container, Row, Col } from 'react-bootstrap';
import {
  FiHome,
  FiLayers,
  FiGrid,
  FiPenTool,
  FiTrendingUp,
} from 'react-icons/fi';
import './Services.css';

const SERVICES = [
  {
    icon: <FiHome />,
    title: 'Custom Home Building',
    description:
      'From concept to completion, we build custom single-family homes tailored to your vision and lifestyle.',
  },
  {
    icon: <FiLayers />,
    title: 'Design-Build',
    description:
      'A streamlined process combining architecture, design, and construction under one roof for a seamless experience.',
  },
  {
    icon: <FiGrid />,
    title: 'Townhome Development',
    description:
      'Thoughtfully designed townhome communities that maximize livability in established Seattle neighborhoods.',
  },
  {
    icon: <FiPenTool />,
    title: 'Interior Design & Selections',
    description:
      'Curated interior finishes and selections that elevate your space with modern, timeless style.',
  },
  {
    icon: <FiTrendingUp />,
    title: 'Investment Opportunities',
    description:
      'We welcome long-hold and project-based investors interested in townhome developments or custom home projects.',
  },
];

function Services() {
  return (
    <section id="services" className="services-section section-padding bg-sage">
      <Container>
        <div className="fade-in-section">
          <div className="section-header">
            <h2>What We Do</h2>
            <p>
              Comprehensive design-build solutions from initial planning through
              final delivery.
            </p>
          </div>
        </div>

        <Row className="justify-content-center">
          {SERVICES.map((service, index) => (
            <Col lg={4} md={6} key={index} className="fade-in-section">
              <div className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
                <div className="service-line" />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Services;
