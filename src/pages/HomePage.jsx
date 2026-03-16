import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiClock, FiLayers, FiLink2, FiMapPin, FiSearch, FiSettings, FiTarget, FiUsers } from 'react-icons/fi';
import siteContent from '../data/siteContent.json';
import projects from '../data/projects.json';
import ProjectCard from '../components/ProjectCard';
import './HomePage.css';

function HomePage() {
  const heroVideoSrc = `${import.meta.env.BASE_URL}${String(siteContent.heroVideo || '').replace(/^\/+/, '')}`;
  const featuredSlugs = [
    'fairmount-ave-sw-dadu',
    'mlk-jr-way-s-townhomes',
    'sw-trenton-st-townhomes',
  ];
  const featuredImageOverrides = {
    'mlk-jr-way-s-townhomes': 'assets/projects/mlk-jr-way-s-townhomes/image-4.jpg',
  };
  const featured = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean)
    .map((project) => ({
      ...project,
      coverImage: featuredImageOverrides[project.slug] || project.coverImage,
    }));
  const valueItems = [
    { title: 'Feasibility first', text: 'Zoning, setbacks, utilities, and critical area risk before major spend.', icon: FiSearch },
    { title: 'End-to-end delivery', text: 'Design, permits, construction, and execution managed by one team.', icon: FiLayers },
    { title: 'Local infill focus', text: 'Seattle, Eastside, and high-opportunity neighborhoods.', icon: FiMapPin },
    { title: 'Execution culture', text: 'Predictable schedule, tight scopes, transparent reporting.', icon: FiClock },
    { title: 'Aligned incentives', text: 'Structures that work for homeowners, investors, and the team.', icon: FiLink2 },
  ];
  const proofItems = [
    { stat: '100+', detail: 'new construction units delivered' },
    { stat: '50+', detail: 'doors under management (BTR)' },
    { stat: 'Infill specialists', detail: 'townhomes, cottages, ADUs' }
  ];
  const aboutItems = [
    {
      title: 'Mission',
      text: 'Create durable infill housing with predictable execution and transparent communication.',
      icon: FiTarget,
    },
    {
      title: 'How we work',
      text: 'Source, feasibility, permits, build, and closeout with owner-level reporting throughout.',
      icon: FiSettings,
    },
    {
      title: 'Team',
      text: 'Builder-first operators with development discipline focused on Seattle and the Eastside.',
      icon: FiUsers,
    },
  ];

  return (
    <>
      <section className="home-hero">
        <video autoPlay muted loop playsInline>
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
        <div className="home-hero-overlay" />
        <Container className="home-hero-inner">
          <div className="meta-line" style={{ color: '#ececec' }}>Westwood Homes</div>
          <h1 className="home-hero-title">Build smarter on the land you already own.</h1>
          <p className="home-hero-subtitle">
            Urban infill developer + builder across the Puget Sound—design, permits, construction, and execution under one roof.
          </p>
          <div className="home-hero-actions">
            <Link className="btn-main" to="/homeowners/unlock-lot">Unlock my lot's potential</Link>
            <Link className="btn-ghost" style={{ color: '#fff', borderColor: '#fff', background: 'rgba(255,255,255,0.1)' }} to="/investors/join">Join investor list</Link>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-header">
            <h2>Our Value</h2>
          </div>
          <Row className="g-4 value-grid justify-content-center">
            {valueItems.map((item) => {
              const Icon = item.icon;
              return (
              <Col md={6} lg={4} key={item.title} className="d-flex">
                <article className="card-min value-card display-only-tile">
                  <span className="tile-icon"><Icon aria-hidden="true" /></span>
                  <h3 className="value-card-title">{item.title}</h3>
                  <p className="value-card-text">{item.text}</p>
                </article>
              </Col>
            );
            })}
          </Row>
        </Container>
      </section>

      <section className="section section--alt">
        <Container>
          <div className="section-header"><h2>Proof</h2></div>
          <Row className="g-4 proof-grid">
            {proofItems.map((item) => (
              <Col md={4} key={item.stat}>
                <article className="card-min proof-card display-only-tile">
                  <div className="proof-card-stat">{item.stat}</div>
                  <p className="proof-card-detail">{item.detail}</p>
                </article>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-header">
            <h2>Who we are</h2>
            <p>Home now includes the key About content so visitors get the full picture in one place.</p>
          </div>
          <Row className="g-4 about-grid">
            {aboutItems.map((item) => {
              const Icon = item.icon;
              return (
              <Col md={6} lg={4} key={item.title}>
                <article className="card-min about-card display-only-tile">
                  <span className="tile-icon"><Icon aria-hidden="true" /></span>
                  <h3 className="about-card-title">{item.title}</h3>
                  <p className="about-card-text">{item.text}</p>
                </article>
              </Col>
            );
            })}
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-header"><h2>Featured Projects</h2></div>
          <Row className="g-4 featured-grid">{featured.map((project) => <Col md={6} lg={4} key={project.slug}><ProjectCard project={project} /></Col>)}</Row>
          <div style={{ marginTop: '1.35rem' }}><Link className="btn-main" to="/projects">See all projects</Link></div>
        </Container>
      </section>

      <section className="section section--alt home-cta-band">
        <Container>
          <h3>Start a feasibility review</h3>
          <p>Share your property details and goals. We will return a clear read in plain English.</p>
          <Link className="btn-main" to="/homeowners/feasibility-review">Get feasibility review</Link>
        </Container>
      </section>
    </>
  );
}

export default HomePage;
