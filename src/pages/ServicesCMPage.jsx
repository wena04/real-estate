import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiActivity, FiClipboard, FiPieChart } from 'react-icons/fi';
import PageHero from '../components/PageHero';

function ServicesCMPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Professional CM for owners who need execution, reporting, and control." subtitle="Bidding, contract admin, schedule control, pay applications, and site QA/QC." />
      <section className="section">
        <Container>
          <div className="section-header page-copy inner-intro">
            <p>Construction management is structured around schedule discipline and owner transparency.</p>
          </div>
          <Row className="g-3">
            <Col md={4}><div className="card-min info-tile"><span className="tile-icon"><FiClipboard aria-hidden="true" /></span><h4>Procurement</h4><p>Bid leveling, scope alignment, and contract clarity.</p></div></Col>
            <Col md={4}><div className="card-min info-tile"><span className="tile-icon"><FiActivity aria-hidden="true" /></span><h4>Controls</h4><p>Schedule tracking, budget visibility, and change management.</p></div></Col>
            <Col md={4}><div className="card-min info-tile"><span className="tile-icon"><FiPieChart aria-hidden="true" /></span><h4>Owner reporting</h4><p>Clear weekly updates and issue escalation with action plans.</p></div></Col>
          </Row>
          <div className="section-actions">
            <Link className="btn-main" to="/contact">Request CM proposal</Link>
          </div>
        </Container>
      </section>
    </>
  );
}

export default ServicesCMPage;
