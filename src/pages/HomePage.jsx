import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FiActivity, FiBarChart2, FiClock, FiCompass, FiEdit3, FiFileText, FiGitBranch, FiLayers, FiLink2, FiMapPin, FiSearch, FiSettings, FiTarget, FiTool, FiTrendingUp, FiUsers } from 'react-icons/fi';
import siteContent from '../data/siteContent.json';
import projects from '../data/projects.json';
import locations from '../data/locations.json';
import ProjectCard from '../components/projects/ProjectCard';
import { sendInquiry } from '../utils/sendInquiry';
import './HomePage.css';

const LazyProjectMap = lazy(() => import('../components/projects/ProjectMap'));

function HomePage() {
  const heroVideoSrc = `${import.meta.env.BASE_URL}${String(siteContent.heroVideo || '').replace(/^\/+/, '')}`;
  const { contact } = siteContent;
  const [selectedProjectSlug, setSelectedProjectSlug] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [visibleProjectCount, setVisibleProjectCount] = useState(6);
  const [copiedField, setCopiedField] = useState('');
  const [formState, setFormState] = useState({
    homeowners: { address: '', photos: '', goal: '', timing: '', email: '', name: '', phone: '' },
    investors: { name: '', email: '', accredited: '', checkSize: '', preference: '', timeline: '' },
    contact: { name: '', email: '', phone: '', message: '' },
  });
  const [submitStatus, setSubmitStatus] = useState({
    homeowners: { loading: false, message: '' },
    investors: { loading: false, message: '' },
    contact: { loading: false, message: '' },
  });
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
    { stat: 'Infill specialists', detail: 'townhomes, cottages, ADUs' },
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
  const homeownersCards = [
    {
      title: 'Unlock lot potential',
      text: 'Assess ADU, DADU, cottage, townhome, or small multiplex paths with realistic risk and yield context.',
      icon: FiCompass,
    },
    {
      title: 'Sell with clarity',
      text: 'Compare market listing and direct-offer pathways against your timing and certainty goals.',
      icon: FiTrendingUp,
    },
    {
      title: 'Feasibility review',
      text: 'Submit your property information and receive plain-English recommendations and next steps.',
      icon: FiActivity,
    },
  ];
  const serviceItems = [
    { title: 'Design + Build', text: 'Integrated planning and construction delivery under one accountable team.', icon: FiEdit3 },
    { title: 'Development Consulting', text: 'Feasibility, entitlement pathing, and risk-roadmap support before major spend.', icon: FiBarChart2 },
    { title: 'Construction Management', text: 'Procurement, controls, owner reporting, and quality oversight from start to finish.', icon: FiTool },
  ];
  const investorOverview = [
    {
      title: 'Process',
      text: 'Sourcing, feasibility, permits, build, and exit/refinance with disciplined underwriting.',
      icon: FiGitBranch,
    },
    {
      title: 'Reporting cadence',
      text: 'Clear status updates, milestone tracking, and concise investor communications.',
      icon: FiFileText,
    },
  ];
  const programFilters = useMemo(
    () => [...new Set(projects.map((project) => project.program))],
    []
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const programMatch = !selectedPrograms.length || selectedPrograms.includes(project.program);
      return programMatch;
    });
  }, [selectedPrograms]);

  const mapPoints = useMemo(() => {
    const allowedSlugs = new Set(filteredProjects.map((project) => project.slug));
    return locations.filter((point) => allowedSlugs.has(point.slug));
  }, [filteredProjects]);
  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleProjectCount),
    [filteredProjects, visibleProjectCount]
  );

  useEffect(() => {
    if (!filteredProjects.some((project) => project.slug === selectedProjectSlug)) {
      setSelectedProjectSlug('');
    }
  }, [filteredProjects, selectedProjectSlug]);

  useEffect(() => {
    setVisibleProjectCount(6);
  }, [selectedPrograms]);

  const updateForm = (section, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const setSectionStatus = (section, loading, message = '') => {
    setSubmitStatus((prev) => ({
      ...prev,
      [section]: { loading, message },
    }));
  };

  const handleSubmit = async (section, payloadBuilder) => {
    try {
      setSectionStatus(section, true, '');
      await sendInquiry(payloadBuilder());
      setSectionStatus(section, false, 'Sent successfully. We will follow up soon.');
    } catch (error) {
      setSectionStatus(section, false, error.message || 'Unable to send right now.');
    }
  };

  const handleCopy = async (key, value) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      window.setTimeout(() => setCopiedField((prev) => (prev === key ? '' : prev)), 1600);
    } catch {
      setCopiedField('');
    }
  };

  const toggleFilterValue = (value, setter) => {
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  return (
    <>
      <section id="home" className="home-hero">
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
            <a className="btn-main" href="#homeowners">Unlock my lot&apos;s potential</a>
            <a className="btn-ghost" style={{ color: '#fff', borderColor: '#fff', background: 'rgba(255,255,255,0.1)' }} href="#investors">Join investor list</a>
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

      <section id="homeowners" className="section">
        <Container>
          <div className="section-header">
            <h2>Homeowners</h2>
            <p>Unlock potential, sell with confidence, and request a practical feasibility review in one place.</p>
          </div>
          <Row className="g-3">
            {homeownersCards.map((item) => {
              const Icon = item.icon;
              return (
                <Col md={6} lg={4} key={item.title}>
                  <article className="card-min info-tile">
                    <span className="tile-icon"><Icon aria-hidden="true" /></span>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </article>
                </Col>
              );
            })}
          </Row>

          <Form
            className="card-min form-card onepage-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit('homeowners', () => ({
                source: 'Homeowners Feasibility Review',
                ...formState.homeowners,
              }));
            }}
          >
            <h4>Start feasibility review</h4>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control value={formState.homeowners.name} onChange={(e) => updateForm('homeowners', 'name', e.target.value)} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={formState.homeowners.email} onChange={(e) => updateForm('homeowners', 'email', e.target.value)} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control value={formState.homeowners.phone} onChange={(e) => updateForm('homeowners', 'phone', e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Property address</Form.Label>
                  <Form.Control value={formState.homeowners.address} onChange={(e) => updateForm('homeowners', 'address', e.target.value)} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Goal</Form.Label>
                  <Form.Select value={formState.homeowners.goal} onChange={(e) => updateForm('homeowners', 'goal', e.target.value)}>
                    <option value="">Select</option>
                    <option>Sell</option>
                    <option>Partner</option>
                    <option>Build and keep</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Timing</Form.Label>
                  <Form.Control value={formState.homeowners.timing} onChange={(e) => updateForm('homeowners', 'timing', e.target.value)} placeholder="0-3 months, etc" />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Photo links</Form.Label>
                  <Form.Control value={formState.homeowners.photos} onChange={(e) => updateForm('homeowners', 'photos', e.target.value)} placeholder="Drive/Dropbox links" />
                </Form.Group>
              </Col>
            </Row>
            <div className="section-actions">
              <button className="btn-main" type="submit" disabled={submitStatus.homeowners.loading}>
                {submitStatus.homeowners.loading ? 'Sending...' : 'Submit feasibility request'}
              </button>
            </div>
            {submitStatus.homeowners.message ? <p className="form-feedback">{submitStatus.homeowners.message}</p> : null}
          </Form>
        </Container>
      </section>

      <section id="services" className="section section--alt">
        <Container>
          <div className="section-header">
            <h2>Services</h2>
            <p>One integrated team for planning, permitting strategy, and construction execution.</p>
          </div>
          <Row className="g-3">
            {serviceItems.map((item) => {
              const Icon = item.icon;
              return (
                <Col md={6} lg={4} key={item.title}>
                  <article className="card-min info-tile">
                    <span className="tile-icon"><Icon aria-hidden="true" /></span>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </article>
                </Col>
              );
            })}
          </Row>
          <div className="section-actions">
            <a className="btn-main" href="#contact">Discuss a project</a>
          </div>
        </Container>
      </section>

      <section id="investors" className="section">
        <Container>
          <div className="section-header">
            <h2>Investors</h2>
            <p>Disciplined infill opportunities with clear underwriting and practical reporting.</p>
          </div>
          <Row className="g-3">
            {investorOverview.map((item) => {
              const Icon = item.icon;
              return (
                <Col md={6} key={item.title}>
                  <article className="card-min info-tile">
                    <span className="tile-icon"><Icon aria-hidden="true" /></span>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </article>
                </Col>
              );
            })}
          </Row>

          <Form
            className="card-min form-card onepage-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit('investors', () => ({
                source: 'Investor Join Request',
                ...formState.investors,
              }));
            }}
          >
            <h4>Join investor list</h4>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control value={formState.investors.name} onChange={(e) => updateForm('investors', 'name', e.target.value)} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={formState.investors.email} onChange={(e) => updateForm('investors', 'email', e.target.value)} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Accredited</Form.Label>
                  <Form.Select value={formState.investors.accredited} onChange={(e) => updateForm('investors', 'accredited', e.target.value)}>
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Target check size</Form.Label>
                  <Form.Control value={formState.investors.checkSize} onChange={(e) => updateForm('investors', 'checkSize', e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Timeline</Form.Label>
                  <Form.Control value={formState.investors.timeline} onChange={(e) => updateForm('investors', 'timeline', e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Return preference</Form.Label>
                  <Form.Control value={formState.investors.preference} onChange={(e) => updateForm('investors', 'preference', e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <div className="section-actions">
              <button className="btn-main" type="submit" disabled={submitStatus.investors.loading}>
                {submitStatus.investors.loading ? 'Sending...' : 'Join investor list'}
              </button>
            </div>
            {submitStatus.investors.message ? <p className="form-feedback">{submitStatus.investors.message}</p> : null}
          </Form>
        </Container>
      </section>

      <section id="projects" className="section section--alt home-cta-band">
        <Container>
          <div className="section-header">
            <h2>Projects</h2>
            <p>Selected work across Seattle and the Eastside. Browse images and map locations.</p>
          </div>
          <div className="project-filter-panel card-min">
            <div className="project-filter-head">
              <div>
                <div className="meta-line">Project filters</div>
                <p className="project-filter-hint">Tip: You can select multiple property types.</p>
              </div>
              <button
                type="button"
                className="btn-ghost project-filter-reset"
                onClick={() => {
                  setSelectedPrograms([]);
                }}
              >
                Reset filters
              </button>
            </div>

            <div className="project-filter-group">
              <div className="project-filter-label">Program</div>
              <div className="project-chip-wrap">
                {programFilters.map((program) => (
                  <button
                    key={program}
                    type="button"
                    className={`project-filter-chip ${selectedPrograms.includes(program) ? 'is-active' : ''}`}
                    onClick={() => toggleFilterValue(program, setSelectedPrograms)}
                  >
                    {program}
                  </button>
                ))}
              </div>
              <p className="project-filter-count">{selectedPrograms.length} selected</p>
            </div>
          </div>

          <div className="project-map-home-wrap">
            <Suspense fallback={<div className="card-min map-placeholder">Loading map...</div>}>
              <LazyProjectMap points={mapPoints} selectedSlug={selectedProjectSlug} onSelect={setSelectedProjectSlug} />
            </Suspense>
          </div>
          <div className="projects-results-meta">
            Showing {visibleProjects.length} of {filteredProjects.length} filtered projects ({projects.length} total)
          </div>
          <Row className="g-4 featured-grid">
            {visibleProjects.map((project) => (
              <Col md={6} lg={4} key={project.slug} onMouseEnter={() => setSelectedProjectSlug(project.slug)}>
                <ProjectCard project={project} showAction={false} />
              </Col>
            ))}
            {!filteredProjects.length ? (
              <Col xs={12}>
                <article className="card-min no-results-card">
                  <h4>No projects match these filters</h4>
                  <p>Try clearing one or both filters to see more projects.</p>
                </article>
              </Col>
            ) : null}
          </Row>
          {visibleProjects.length < filteredProjects.length ? (
            <div className="section-actions projects-load-more">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setVisibleProjectCount((prev) => prev + 6)}
              >
                Show more projects
              </button>
            </div>
          ) : null}
        </Container>
      </section>

      <section id="contact" className="section">
        <Container>
          <div className="section-header">
            <h2>Contact</h2>
            <p>Tell us about your project goals and timeline. We will follow up shortly.</p>
          </div>
          <Form
            className="card-min form-card onepage-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit('contact', () => ({
                source: 'General Contact',
                ...formState.contact,
              }));
            }}
          >
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control value={formState.contact.name} onChange={(e) => updateForm('contact', 'name', e.target.value)} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={formState.contact.email} onChange={(e) => updateForm('contact', 'email', e.target.value)} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control value={formState.contact.phone} onChange={(e) => updateForm('contact', 'phone', e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} value={formState.contact.message} onChange={(e) => updateForm('contact', 'message', e.target.value)} required />
                </Form.Group>
              </Col>
            </Row>
            <div className="section-actions">
              <button className="btn-main" type="submit" disabled={submitStatus.contact.loading}>
                {submitStatus.contact.loading ? 'Sending...' : 'Send inquiry'}
              </button>
            </div>
            {submitStatus.contact.message ? <p className="form-feedback">{submitStatus.contact.message}</p> : null}
          </Form>
          <Row className="g-3 onepage-contact-links">
            <Col md={4}>
              <article className="card-min info-tile">
                <h4>Phone</h4>
                <p><a href={`tel:${contact.phoneHref}`}>{contact.phone}</a></p>
                <button
                  type="button"
                  className="btn-ghost contact-action-btn"
                  onClick={() => handleCopy('phone', contact.phone)}
                >
                  {copiedField === 'phone' ? 'Copied' : 'Copy phone'}
                </button>
              </article>
            </Col>
            <Col md={4}>
              <article className="card-min info-tile">
                <h4>Email</h4>
                <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                <button
                  type="button"
                  className="btn-ghost contact-action-btn"
                  onClick={() => handleCopy('email', contact.email)}
                >
                  {copiedField === 'email' ? 'Copied' : 'Copy email'}
                </button>
              </article>
            </Col>
            <Col md={4}>
              <article className="card-min info-tile">
                <h4>Office</h4>
                <p><a href={contact.mapUrl} target="_blank" rel="noreferrer">{contact.addressFull}</a></p>
                <a href={contact.mapUrl} target="_blank" rel="noreferrer" className="btn-main contact-action-btn">
                  Get directions
                </a>
              </article>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default HomePage;
