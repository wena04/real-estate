import { useState } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import projects from '../data/projects.json';
import './ProjectDetailPage.css';

const projectContent = {
  'se-44th-pl-single-family': {
    summary:
      'A Bellevue single-family delivery focused on efficient circulation, natural light, and durable finishes suited for long-term ownership.',
    highlights: ['Clean modern envelope with high-performing windows', 'Interior layout tuned for daily family flow', 'Finish selections prioritized for durability and resale confidence'],
  },
  'se-44th-pl-residence-single-family': {
    summary:
      'Companion single-family residence in the same Bellevue submarket with an emphasis on comfort-forward interiors and polished detailing.',
    highlights: ['Open social spaces balanced with private bedroom zones', 'Built-in storage moments integrated throughout', 'Execution paced for predictable handoff quality'],
  },
  'fairmount-ave-sw-dadu': {
    summary:
      'A compact DADU in West Seattle designed to maximize usable square footage on an infill lot while preserving a clean street-facing identity.',
    highlights: ['Smart footprint strategy for a constrained urban site', 'Strong daylight penetration and practical room planning', 'Delivered with close attention to neighborhood fit'],
  },
  'mlk-jr-way-s-townhomes': {
    summary:
      'A townhome infill project delivered with repeatable unit logic, coordinated exterior massing, and construction sequencing built for schedule control.',
    highlights: ['Multi-unit planning aligned with urban context', 'Consistent facade rhythm across the building set', 'Construction workflow optimized for phased delivery'],
  },
  'mlk-jr-way-s-townhomes-phase-2': {
    summary:
      'Second-phase townhome continuation extending prior design language while improving execution logistics and unit-level efficiency.',
    highlights: ['Phase continuity with selective design refinements', 'Refined detailing based on phase-one learnings', 'Active construction managed around quality checkpoints'],
  },
  'n-64th-st-townhomes': {
    summary:
      'North Seattle townhome project centered on practical livability, durable materials, and disciplined budget-to-build alignment.',
    highlights: ['Functional layouts tailored for urban households', 'Material palette balanced for cost and longevity', 'Schedule transparency maintained from permits to closeout'],
  },
  '3rd-ave-nw-adu': {
    summary:
      'Permitting-stage ADU concept focused on adding high-value auxiliary housing with realistic constructability and clear entitlement strategy.',
    highlights: ['Feasibility-first planning during entitlement phase', 'Early utility and access constraints identified', 'Program optimized for future rental flexibility'],
  },
  '23rd-ave-s-townhomes': {
    summary:
      'Completed townhome work with straightforward circulation planning and a modern exterior expression tuned for long-term asset quality.',
    highlights: ['Cohesive multi-unit architecture and streetscape fit', 'Construction scope tightly controlled during delivery', 'Completed with attention to closeout quality standards'],
  },
  'oberlin-ave-n-single-family': {
    summary:
      'Single-family build in active construction emphasizing predictable sequencing, quality control, and finish consistency.',
    highlights: ['Construction-phase coordination across trades', 'Quality assurance on framing-to-finish transitions', 'Site execution aligned to milestone reporting cadence'],
  },
  's-orcas-st-single-family': {
    summary:
      'Feasibility-stage single-family study evaluating zoning pathways, lot constraints, and realistic development options before major spend.',
    highlights: ['Early-stage risk screening and site diagnostics', 'Program options tested against entitlement constraints', 'Decision framework prepared for next-step planning'],
  },
  'sw-trenton-st-townhomes': {
    summary:
      'Completed townhome delivery in Southwest Seattle designed for practical urban living and repeatable construction quality.',
    highlights: ['Modern unit mix aligned with neighborhood demand', 'Exterior language and scale calibrated to context', 'Delivered with clear schedule and scope discipline'],
  },
  'myrtle-st-s-dadu': {
    summary:
      'Completed DADU project balancing compact design efficiency with comfortable interior usability and neighborhood compatibility.',
    highlights: ['Small-footprint planning with strong functionality', 'Interior finish strategy focused on long-term upkeep', 'Infill delivery managed with predictable execution controls'],
  },
};

const statusDescriptions = {
  Completed: 'This project has been completed and is part of Westwood Homes delivered portfolio.',
  Construction: 'This project is currently in active construction with milestone-based progress tracking.',
  Permitting: 'This project is in permitting with entitlement, documentation, and agency coordination underway.',
  Feasibility: 'This project is in feasibility review to confirm development path, risks, and highest-value next steps.',
};

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const [activeSlide, setActiveSlide] = useState(0);
  const galleryImages = project
    ? Array.from({ length: 6 }, (_, idx) =>
        `${import.meta.env.BASE_URL}${String(`${project.assetFolder}/image-${idx + 1}.jpg`).replace(/^\/+/, '')}`
      )
    : [];
  const detail = project ? projectContent[project.slug] : null;
  const summary =
    detail?.summary ||
    `A ${project?.program?.toLowerCase() || 'residential'} project in ${project?.city || 'the Seattle area'} delivered with Westwood Homes' feasibility-first and execution-focused process.`;
  const highlights = detail?.highlights || [
    'Feasibility and constructability reviewed before major spend',
    'Schedule and scope managed through clear milestones',
    'Quality and closeout expectations aligned early in delivery',
  ];
  const statusDetail = project ? statusDescriptions[project.status] || statusDescriptions.Completed : '';

  if (!project) {
    return (
      <section className="section"><Container><h2>Project not found</h2><Link to="/projects" className="btn-main">Back to Projects</Link></Container></section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Project Detail"
        title={project.displayName}
        subtitle={`${project.program} · ${project.status} · ${project.city}`}
      />
      <section className="section section--alt">
        <Container>
          <Row className="g-4">
            <Col lg={8}>
              <div className="card-min info-tile project-detail-card">
                <Carousel
                  className="project-gallery"
                  interval={5000}
                  indicators
                  activeIndex={activeSlide}
                  onSelect={(selectedIndex) => setActiveSlide(selectedIndex)}
                >
                  {galleryImages.map((src, idx) => (
                    <Carousel.Item key={`${project.slug}-image-${idx + 1}`}>
                      <img src={src} alt={`${project.displayName} photo ${idx + 1}`} className="project-gallery-image" />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <div className="project-gallery-thumbs" aria-label="Project image thumbnails">
                  {galleryImages.map((src, idx) => (
                    <button
                      key={`${project.slug}-thumb-${idx + 1}`}
                      type="button"
                      className={`project-thumb-btn ${activeSlide === idx ? 'is-active' : ''}`}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img src={src} alt="" className="project-thumb-image" />
                    </button>
                  ))}
                </div>

                <h4>Overview</h4>
                <p>{summary}</p>
                <p className="project-status-text">{statusDetail}</p>
              </div>
            </Col>

            <Col lg={4}>
              <div className="card-min info-tile project-detail-side">
                <h4>Project snapshot</h4>
                <ul className="list-clean">
                  <li><strong>Program:</strong> {project.program}</li>
                  <li><strong>Status:</strong> {project.status}</li>
                  <li><strong>City:</strong> {project.city}</li>
                </ul>

                <h4>Execution highlights</h4>
                <ul className="list-clean">
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="section-actions">
                  <Link className="btn-main" to="/contact">Talk to us about a similar site</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default ProjectDetailPage;
