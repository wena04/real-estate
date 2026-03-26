import { lazy, Suspense, useMemo, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FiActivity, FiBarChart2, FiCompass, FiEdit3, FiTool, FiTrendingUp } from 'react-icons/fi';
import siteContent from '../data/siteContent.json';
import projects from '../data/projects.json';
import locations from '../data/locations.json';
import ProjectCard from '../components/projects/ProjectCard';
import { sendInquiry } from '../utils/sendInquiry';
import './HomePage.css';

const LazyProjectMap = lazy(() => import('../components/projects/ProjectMap'));

function projectCoverSrc(project) {
  return `${import.meta.env.BASE_URL}${String(project.coverImage || '').replace(/^\/+/, '')}`;
}

function HomePage() {
  const heroVideoSrc = `${import.meta.env.BASE_URL}${String(siteContent.heroVideo || '').replace(/^\/+/, '')}`;
  const servicesFeatureImageSrc = `${import.meta.env.BASE_URL}assets/sections/services/services-feature.png`;
  const investorsFeatureImageSrc = `${import.meta.env.BASE_URL}assets/sections/investors/investors-feature.png`;
  const { contact } = siteContent;
  const [visibleProjectCount, setVisibleProjectCount] = useState(6);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState('');
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
  const homeownersCards = [
    {
      title: 'Build & Increase Value',
      headline: 'Build to Grow Your Equity and Income',
      description:
        'Your land may be worth more than you think. Whether it’s adding an ADU for rental income, subdividing, or developing new homes for sale, we help you identify the highest and best use of your property. Every project is tailored — some maximize cash flow, others maximize resale value.',
      bullets: [
        'Add ADU / DADU for passive income',
        'Increase property value and equity',
        'Full-lot development for maximum return',
      ],
      cta: 'Explore Development Options',
      ctaHref: '#homeowners-form',
      icon: FiTrendingUp,
    },
    {
      title: 'Sell Without the Hassle',
      headline: 'Prefer a Simple Sale? We Buy Properties Directly',
      description:
        'If you’d rather avoid the time, risk, and complexity of development, we offer a straightforward purchase option. No need to manage permits, construction, or market uncertainty — we handle everything.',
      bullets: [
        'Fast and flexible closing',
        'No construction or permitting hassle',
        'Sell as-is',
      ],
      cta: 'Get a Direct Offer',
      ctaHref: '#contact',
      icon: FiCompass,
    },
    {
      title: 'Start with Feasibility',
      headline: 'Start with a Feasibility Analysis',
      description:
        'Not sure what your property can support? We provide a professional feasibility study to help you understand zoning, development potential, costs, and projected returns — so you can make informed decisions before committing.',
      bullets: [
        'Zoning & development potential review',
        'Preliminary cost and ROI analysis',
        'Clear, data-driven recommendations',
      ],
      cta: 'Start with Feasibility Analysis',
      ctaHref: '#homeowners-form',
      icon: FiActivity,
    },
  ];
  const serviceItems = [
    {
      title: 'Design & Consultant Coordination',
      headline: 'We Turn Your Vision Into a Buildable Plan',
      description: 'We help homeowners assemble the right team of architects, engineers, and consultants to transform ideas into a clear, buildable design. From early concepts to permit-ready drawings, we guide the process to ensure your project is aligned with your goals, budget, and site conditions.',
      bullets: [
        'Coordinate architect, structural, and MEP consultants',
        'Align design with budget and constructability',
        'Navigate city requirements and permitting process',
      ],
      cta: 'Start Your Design Process',
      ctaHref: '#contact',
      icon: FiEdit3,
    },
    {
      title: 'General Contracting (Build Execution)',
      headline: 'From Paper to Reality - Built Right',
      description: 'Already have plans? We step in as your general contractor to execute the project with precision. Our team brings your drawings to life with disciplined construction practices, reliable scheduling, and consistent quality control.',
      bullets: [
        'Full construction execution',
        'Experienced subcontractor network',
        'Clear timeline and cost control',
      ],
      cta: 'Build With Us',
      ctaHref: '#contact',
      icon: FiTool,
    },
    {
      title: 'Development & Feasibility Support',
      headline: 'Build Smarter - Start With the Right Strategy',
      description: 'We help homeowners evaluate and shape their projects from a development perspective. From feasibility analysis to design optimization, we ensure your project is financially viable and aligned with market demand. You can choose to proceed with us through construction - or exit the project once permits are secured.',
      bullets: [
        'Feasibility and highest-best-use analysis',
        'Cost and return projections',
        'Flexible exit options after permitting',
      ],
      cta: 'Evaluate My Project',
      ctaHref: '#homeowners-form',
      icon: FiBarChart2,
    },
  ];
  const investorInvestmentCards = [
    {
      key: 'short-term',
      title: 'Short-Term Investment (Build-to-Sell Development)',
      headline: 'Short-Term Returns Through Project Execution',
      description:
        'Invest in residential development projects with clear timelines and exit strategies, where returns are generated through execution and sale upon completion.',
      highlights: [
        'Typical duration: 18–24 months',
        'Structured entry and exit',
        'Returns driven by project execution and sale',
        'Includes both single-family and small-scale multi-unit developments (ADUs, cottages, and townhomes)',
      ],
    },
    {
      key: 'long-term',
      title: 'Long-Term Investment (Build-to-Rent)',
      headline: 'Long-Term Cash Flow and Appreciation',
      description:
        'Invest in townhome build-to-rent projects designed for stable rental income and long-term asset growth.',
      highlights: [
        'Ongoing rental cash flow',
        'Long-term appreciation',
        'Professionally managed assets',
      ],
    },
  ];
  const investorRoleBlock = {
    sectionTitle: 'Our Role',
    headline: 'We Manage Everything',
    description:
      'From acquisition and feasibility to construction and final delivery, Westwood handles the entire process — allowing investors to remain fully passive.',
    listTitle: 'What we handle:',
    items: [
      'Site acquisition and underwriting',
      'Design and permitting',
      'Construction execution',
      'Leasing or disposition',
    ],
  };
  const investorAccessBlock = {
    sectionTitle: 'Access to Opportunities',
    headline: 'Stay Informed. Invest When Ready.',
    description:
      'We share select opportunities with our investor network as they become available. Each offering includes clear project details, timelines, and return expectations.',
  };
  const visibleProjects = projects.slice(0, visibleProjectCount);
  const mapPoints = useMemo(() => locations, []);

  const servicesAudienceTabs = ['Homeowners', 'Investors', 'Builders'];
  const [servicesAudience, setServicesAudience] = useState('Homeowners');
  const servicesAudienceConfig = useMemo(
    () => ({
      Homeowners: {
        programs: ['Single Family', 'ADU', 'DADU'],
        href: '#homeowners',
        headline: 'Increase value, simplify the process, and build with confidence.',
        cta: 'Explore homeowner options',
      },
      Investors: {
        programs: ['Townhomes'],
        href: '#investors',
        headline: 'Passive participation with full execution handled by Westwood.',
        cta: 'See investor pathways',
      },
      Builders: {
        programs: ['DADU', 'ADU', 'Single Family', 'Townhomes'],
        href: '#contact',
        headline: 'Design coordination, feasibility support, and disciplined build execution.',
        cta: 'Talk to our team',
      },
    }),
    [],
  );
  const servicesAudiencePrograms = servicesAudienceConfig[servicesAudience]?.programs || [];
  const servicesAudienceProjects = useMemo(() => {
    const filtered = projects.filter((p) => servicesAudiencePrograms.includes(p.program));
    return filtered.length ? filtered : projects;
  }, [servicesAudience, servicesAudiencePrograms]);
  const servicesFeaturedProject = servicesAudienceProjects[0];
  const servicesCandidateTiles = servicesAudienceProjects.slice(1, 4);
  const servicesAudienceHeadline = servicesAudienceConfig[servicesAudience]?.headline || '';
  const servicesAudienceHref = servicesAudienceConfig[servicesAudience]?.href || '#contact';
  const servicesAudienceCta = servicesAudienceConfig[servicesAudience]?.cta || 'Contact us';
  const servicesTileItems = useMemo(() => {
    const baseTitles = [
      'Design + Coordination',
      'Build Execution',
      'Feasibility + Strategy',
    ];
    return baseTitles
      .map((title, idx) => ({
        title,
        href: servicesAudienceHref,
        project: servicesCandidateTiles[idx] || servicesFeaturedProject,
      }))
      .filter((item) => item.project);
  }, [servicesCandidateTiles, servicesFeaturedProject, servicesAudienceHref]);

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

  return (
    <>
      <section id="home" className="home-hero">
        <video autoPlay muted loop playsInline>
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
        <div className="home-hero-overlay" />
        <Container className="home-hero-inner">
          <div className="meta-line" style={{ color: '#ececec' }}>Westwood Homes</div>
          <h1 className="home-hero-title">Crafting Homes That Define Your Future</h1>
          <p className="home-hero-subtitle">
            Where Vision Meets Execution
          </p>
          <div className="home-hero-actions">
            <a className="btn-main" href="#services">Design + Build</a>
            <a className="btn-ghost" style={{ color: '#fff', borderColor: '#fff', background: 'rgba(255,255,255,0.1)' }} href="#investors">Join investor list</a>
          </div>
        </Container>
      </section>

      <section id="services" className="section section--alt">
        <Container>
          <div className="services-showcase">
            <div className="section-header services-showcase-header">
              <h2>Services</h2>
              <p>Whether you are at concept stage or ready to build, we provide practical support at every step.</p>
            </div>

            <div className="services-showcase-tabs" role="tablist" aria-label="Services by audience">
              {servicesAudienceTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={servicesAudience === tab}
                  className={`services-showcase-tab${servicesAudience === tab ? ' is-active' : ''}`}
                  onClick={() => setServicesAudience(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {servicesFeaturedProject ? (
              <>
                <a href={servicesAudienceHref} className="services-showcase-hero">
                  <img
                    className="services-showcase-hero-img"
                    src={projectCoverSrc(servicesFeaturedProject)}
                    alt={servicesFeaturedProject.displayName}
                    loading="lazy"
                  />
                  <div className="services-showcase-hero-gradient" aria-hidden="true" />
                  <div className="services-showcase-hero-inner">
                    <p className="services-showcase-hero-kicker">For {servicesAudience}</p>
                    <p className="services-showcase-hero-headline">{servicesAudienceHeadline}</p>
                    <span className="services-showcase-hero-link">
                      {servicesAudienceCta}
                      <span aria-hidden="true"> →</span>
                    </span>
                  </div>
                </a>

                <div className="services-showcase-tiles">
                  {servicesTileItems.map((tile) => (
                    <a href={tile.href} className="services-showcase-tile" key={tile.title}>
                      <img
                        src={projectCoverSrc(tile.project)}
                        alt={tile.project.displayName}
                        className="services-showcase-tile-img"
                        loading="lazy"
                      />
                      <div className="services-showcase-tile-gradient" aria-hidden="true" />
                      <span className="services-showcase-tile-label">{tile.title}</span>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <p className="services-showcase-empty">No projects to preview yet.</p>
            )}
          </div>

          <p className="service-closing-line">
            No matter where you are in the process - idea, design, or ready to build - we meet you there and take you forward.
          </p>
        </Container>
      </section>

      <section id="investors" className="section">
        <Container>
          <div className="section-header">
            <h2>Investors</h2>
            <p>
              Build-to-sell and build-to-rent pathways, full execution by Westwood, and a simple way to join the list when you are ready.
            </p>
          </div>

          <Row className="g-4 align-items-start investor-feature-row">
            <Col lg={5}>
              <div className="section-media-block section-media-block--tight investor-image-block">
                <img
                  className="section-media-image investor-image"
                  src={investorsFeatureImageSrc}
                  alt="New construction exterior at dusk"
                  loading="lazy"
                />
              </div>
            </Col>
            <Col lg={7}>
              <Row className="g-3 investor-top-row">
                {investorInvestmentCards.map((item) => (
                  <Col md={6} key={item.key}>
                    <article className="card-min investor-block investor-block--compact">
                      <p className="investor-block-kicker">{item.title}</p>
                      <h3 className="investor-block-headline">{item.headline}</h3>
                      <p>{item.description}</p>
                      <p className="investor-highlights-label">Highlights</p>
                      <ul className="list-clean investor-highlights-list">
                        {item.highlights.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </article>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <article className="card-min investor-block investor-block-wide">
            <p className="investor-block-kicker">{investorRoleBlock.sectionTitle}</p>
            <h3 className="investor-block-headline">{investorRoleBlock.headline}</h3>
            <p>{investorRoleBlock.description}</p>
            <p className="investor-highlights-label">{investorRoleBlock.listTitle}</p>
            <ul className="list-clean investor-highlights-list">
              {investorRoleBlock.items.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>

          <article className="card-min investor-block investor-block-wide investor-access-block">
            <p className="investor-block-kicker">{investorAccessBlock.sectionTitle}</p>
            <h3 className="investor-block-headline">{investorAccessBlock.headline}</h3>
            <p>{investorAccessBlock.description}</p>
            <div className="section-actions">
              <a className="btn-main" href="#investors-form">
                Join the Investor List
              </a>
            </div>
          </article>

          <Form
            id="investors-form"
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
            <p>
              With over a decade of experience, Westwood Homes has delivered 100+ new construction units and manages a growing portfolio of 100+ rental homes. Our projects span custom homes to multi-unit residential developments, executed across both build-to-sell and long-term hold strategies.
            </p>
          </div>
          <Row className="g-4 featured-grid">
            {visibleProjects.map((project) => (
              <Col
                md={6}
                lg={4}
                key={project.slug}
                onMouseEnter={() => setSelectedProjectSlug(project.slug)}
              >
                <ProjectCard project={project} showAction={false} />
              </Col>
            ))}
          </Row>
          {visibleProjects.length < projects.length ? (
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

          <div className="projects-map-block">
            <h3 className="projects-map-title">Project locations</h3>
            <div className="project-map-home-wrap">
              <Suspense fallback={<div className="card-min map-placeholder">Loading map...</div>}>
                <LazyProjectMap
                  points={mapPoints}
                  selectedSlug={selectedProjectSlug}
                  onSelect={setSelectedProjectSlug}
                />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      <section id="homeowners" className="section">
        <Container>
          <div className="section-header section-header--title-only">
            <h2>Homeowners</h2>
          </div>
          <Row className="g-3 homeowners-compact-row">
            <Col lg={5}>
              <article className="card-min homeowners-intro">
                <h3 className="homeowners-intro-title">Options for your property</h3>
                <p className="homeowners-intro-copy">
                  Choose the path that best matches your goals — build for upside, sell simply, or start with a feasibility review before deciding.
                </p>
              </article>
            </Col>
            <Col lg={7}>
              <div className="homeowners-compact-list">
                {homeownersCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article className="homeowners-compact-item" key={item.title}>
                      <span className="homeowners-compact-icon"><Icon aria-hidden="true" /></span>
                      <div className="homeowners-compact-body">
                        <h4 className="homeowners-compact-title">{item.title}</h4>
                        <p className="homeowners-compact-headline">{item.headline}</p>
                        <p className="homeowners-compact-description">{item.description}</p>
                        <ul className="list-clean homeowners-compact-bullets">
                          {item.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                        <div className="homeowners-compact-actions">
                          <a className="btn-main" href={item.ctaHref}>{item.cta}</a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Col>
          </Row>

          <Form
            id="homeowners-form"
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

      <section id="contact" className="section">
        <Container>
          <div className="section-header">
            <h2>Contact</h2>
            <p>Tell us about your project goals and timeline. We will follow up shortly.</p>
          </div>
          <div className="card-min form-card onepage-form contact-unified-card">
            <Form
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
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={4} value={formState.contact.message} onChange={(e) => updateForm('contact', 'message', e.target.value)} required />
                  </Form.Group>
                </Col>
                <Col md={6} lg={5}>
                  <Form.Group>
                    <Form.Label>
                      Phone <span className="contact-label-muted">(optional)</span>
                    </Form.Label>
                    <Form.Control value={formState.contact.phone} onChange={(e) => updateForm('contact', 'phone', e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <div className="section-actions contact-form-actions">
                <button className="btn-main" type="submit" disabled={submitStatus.contact.loading}>
                  {submitStatus.contact.loading ? 'Sending...' : 'Send inquiry'}
                </button>
              </div>
              {submitStatus.contact.message ? <p className="form-feedback">{submitStatus.contact.message}</p> : null}
            </Form>

            <div className="contact-unified-footer" aria-label="Contact details">
              <div className="contact-footer-grid">
                <div className="contact-footer-slot">
                  <span className="contact-footer-kicker">Phone</span>
                  <div className="contact-footer-line">
                    <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
                    <button
                      type="button"
                      className="btn-ghost contact-footer-copy"
                      onClick={() => handleCopy('phone', contact.phone)}
                    >
                      {copiedField === 'phone' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="contact-footer-slot">
                  <span className="contact-footer-kicker">Email</span>
                  <div className="contact-footer-line">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    <button
                      type="button"
                      className="btn-ghost contact-footer-copy"
                      onClick={() => handleCopy('email', contact.email)}
                    >
                      {copiedField === 'email' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="contact-footer-slot contact-footer-slot--wide">
                  <span className="contact-footer-kicker">Office</span>
                  <div className="contact-footer-line contact-footer-line--office">
                    <a href={contact.mapUrl} target="_blank" rel="noreferrer" className="contact-footer-address">{contact.addressFull}</a>
                    <a href={contact.mapUrl} target="_blank" rel="noreferrer" className="btn-main contact-directions-btn">
                      Get directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default HomePage;
