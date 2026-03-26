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

const CONTACT_CTA_LABEL = 'Contact us';
const INQUIRY_SUBMIT_LABEL = 'Send inquiry';

function HomePage() {
  const heroVideoSrc = `${import.meta.env.BASE_URL}${String(siteContent.heroVideo || '').replace(/^\/+/, '')}`;
  const servicesFeatureImageSrc = `${import.meta.env.BASE_URL}assets/sections/services/services-feature.jpg?v=2`;
  const investorsFeatureImageSrc = `${import.meta.env.BASE_URL}assets/sections/investors/investors-feature.jpg?v=2`;
  const homeownersFeatureImageSrc = `${import.meta.env.BASE_URL}assets/projects/n-64th-st-townhomes/cover-facade.png?v=2`;
  const [visibleProjectCount, setVisibleProjectCount] = useState(6);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState('');
  const [formState, setFormState] = useState({
    homeowners: { address: '', photos: '', goal: '', timing: '', email: '', name: '', phone: '' },
    investors: { name: '', email: '' },
  });
  const [submitStatus, setSubmitStatus] = useState({
    homeowners: { loading: false, message: '' },
    investors: { loading: false, message: '' },
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
      icon: FiActivity,
      ctaHref: '#contact',
      ctaLabel: CONTACT_CTA_LABEL,
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
            <a
              className="btn-ghost"
              style={{ color: '#fff', borderColor: '#fff', background: 'rgba(255,255,255,0.1)' }}
              href="#investors"
            >
              Join investor list
            </a>
          </div>
        </Container>
      </section>

      <section id="services" className="section section--alt">
        <Container>
          <div className="section-header">
            <h2>Services</h2>
            <p>Whether you are at concept stage or ready to build, we provide practical support at every step.</p>
          </div>
          <div className="section-media-block section-band-media">
            <img
              className="section-band-media-image"
              src={servicesFeatureImageSrc}
              alt="Recent project aerial view"
              loading="lazy"
            />
          </div>
          <div className="services-stack-body services-feature-row">
            <div className="services-feature-left">
              <div className="card-min services-unified-card">
                <div className="services-compact-list">
                  {serviceItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article className="services-compact-item" key={item.title}>
                        <span className="services-compact-icon"><Icon aria-hidden="true" /></span>
                        <div className="services-compact-body">
                          <h4 className="services-compact-title">{item.title}</h4>
                          <p className="services-compact-headline">{item.headline}</p>
                          <p className="services-compact-description">{item.description}</p>
                          <ul className="list-clean services-compact-bullets">
                            {item.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
              <p className="service-closing-line">
                No matter where you are in the process - idea, design, or ready to build - we meet you there and take you forward.
              </p>
              <div className="section-actions services-text-cta">
                <a className="btn-main" href="#contact">{CONTACT_CTA_LABEL}</a>
              </div>
            </div>
          </div>
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

          <div className="section-media-block section-band-media">
            <img
              className="section-band-media-image"
              src={investorsFeatureImageSrc}
              alt="New construction exterior at dusk"
              loading="lazy"
            />
          </div>
          <Row className="g-3 investor-top-row investor-feature-row">
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

          <Form
            id="investors-form"
            className="card-min form-card onepage-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit('investors', () => ({
                source: 'Investor List Signup',
                ...formState.investors,
              }));
            }}
          >
            <h4>{investorAccessBlock.headline}</h4>
            <p>{investorAccessBlock.description}</p>
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
            </Row>
            <div className="section-actions">
              <button className="btn-main" type="submit" disabled={submitStatus.investors.loading}>
                {submitStatus.investors.loading ? 'Sending...' : INQUIRY_SUBMIT_LABEL}
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
          <div className="section-actions projects-section-cta">
            <a className="btn-main" href="#contact">{CONTACT_CTA_LABEL}</a>
          </div>
        </Container>
      </section>

      <section id="homeowners" className="section">
        <Container>
          <div className="section-header section-header--title-only">
            <h2>Homeowners</h2>
          </div>
          <div className="section-media-block section-band-media">
            <img
              className="section-band-media-image"
              src={homeownersFeatureImageSrc}
              alt="Westwood townhome development exterior"
              loading="lazy"
            />
          </div>
          <div className="homeowners-stack-body homeowners-compact-row">
            <div className="homeowners-zigzag-copy">
              <article className="card-min homeowners-intro">
                <h3 className="homeowners-intro-title">Options for your property</h3>
                <p className="homeowners-intro-copy">
                  Choose the path that best matches your goals — build for upside, sell simply, or start with a feasibility review before deciding.
                </p>
              </article>
              <div className="card-min homeowners-unified-card homeowners-zigzag-unified">
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
                          {item.ctaHref ? (
                            <div className="homeowners-inline-cta">
                              <a className="btn-ghost" href={item.ctaHref}>{item.ctaLabel}</a>
                            </div>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
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
