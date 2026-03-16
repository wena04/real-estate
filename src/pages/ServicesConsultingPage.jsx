import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiBarChart2, FiCompass } from 'react-icons/fi';
import PageHero from '../components/PageHero';

function ServicesConsultingPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Feasibility, entitlements, and strategy—before you spend big money." subtitle="Concept options, yield study, soft cost roadmap, timeline and risk flags." />
      <section className="section">
        <Container>
          <div className="section-header page-copy inner-intro">
            <p>Consulting engagements focus on reducing unknowns early so your next move is data-backed.</p>
          </div>
          <Row className="g-3">
            <Col md={4}><div className="card-min info-tile"><span className="tile-icon"><FiCompass aria-hidden="true" /></span><h4>Site feasibility</h4><p>Zoning checks, setbacks, and constraint screening.</p></div></Col>
            <Col md={4}><div className="card-min info-tile"><span className="tile-icon"><FiBarChart2 aria-hidden="true" /></span><h4>Yield options</h4><p>Program scenarios and unit mix options based on your goals.</p></div></Col>
            <Col md={4}><div className="card-min info-tile"><span className="tile-icon"><FiAlertTriangle aria-hidden="true" /></span><h4>Risk roadmap</h4><p>Timeline, permit dependencies, and key decision milestones.</p></div></Col>
          </Row>
          <div className="section-actions">
            <Link className="btn-main" to="/contact">Book consulting call</Link>
          </div>
        </Container>
      </section>
    </>
  );
}

export default ServicesConsultingPage;
