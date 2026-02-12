import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Portfolio.css';

const FILTERS = ['All', 'Townhomes', 'Single Family', 'Interiors'];

const PROJECTS = [
  {
    title: 'Central District Townhomes',
    category: 'Townhomes',
    neighborhood: 'Central District, Seattle',
    description: 'Infill townhomes thoughtfully crafted for modern city living.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Georgetown Townhomes',
    category: 'Townhomes',
    neighborhood: 'Georgetown, Seattle',
    description:
      'Contemporary townhomes built with industrial-inspired character.',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'West Seattle Living',
    category: 'Townhomes',
    neighborhood: 'West Seattle',
    description:
      'Bright, coastal-inspired townhomes tailored for West Seattle living.',
    image:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Ballard Residence',
    category: 'Single Family',
    neighborhood: 'Ballard, Seattle',
    description:
      'Modern residence featuring sharp lines and elevated finishes.',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Green Lake Homes',
    category: 'Single Family',
    neighborhood: 'Green Lake, Seattle',
    description:
      'Modern homes steps from Green Lake\'s lifestyle amenities.',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Clyde Hill Custom Home',
    category: 'Single Family',
    neighborhood: 'Clyde Hill, Bellevue',
    description:
      'A refined single-family home blending comfort with clean Northwest design.',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Modern Luxury Interiors',
    category: 'Interiors',
    neighborhood: 'Design Studio',
    description:
      'High-contrast interiors with elevated luxury finishes.',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Warm Contemporary Finishes',
    category: 'Interiors',
    neighborhood: 'Design Studio',
    description:
      'Warm, curated materials that elevate everyday living.',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
  },
];

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="portfolio-section section-padding bg-cream">
      <Container>
        <div className="fade-in-section">
          <div className="section-header">
            <h2>Our Portfolio</h2>
            <p>
              Explore our collection of thoughtfully designed homes across
              Seattle's most desirable neighborhoods.
            </p>
          </div>
        </div>

        <div className="portfolio-filters fade-in-section">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <Row className="portfolio-grid">
          {filteredProjects.map((project, index) => (
            <Col lg={4} md={6} key={index} className="fade-in-section">
              <div className="portfolio-card">
                <div className="portfolio-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="portfolio-image"
                  />
                  <div className="portfolio-overlay">
                    <div className="portfolio-overlay-content">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <span className="portfolio-view-btn">View Project</span>
                    </div>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h5 className="portfolio-title">{project.title}</h5>
                  <span className="portfolio-neighborhood">
                    {project.neighborhood}
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Portfolio;
