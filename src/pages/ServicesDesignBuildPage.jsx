import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiEdit3, FiFileText, FiTool } from 'react-icons/fi';
import PageHero from '../components/PageHero';

function ServicesDesignBuildPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="One team from concept to completion." subtitle="Architecture coordination, permitting support, budget and schedule, and construction under one delivery system." />
      <section className="section">
        <Container>
          <div className="section-header page-copy inner-intro">
            <p>Our design-build process keeps accountability in one place from first concept through handover.</p>
          </div>
          <Row className="g-3">
            <Col md={4}><div className="card-min info-tile"><span className="tile-icon"><FiEdit3 aria-hidden="true" /></span><h4>Early planning</h4><p>Scope alignment, budget targets, and buildability before design drifts.</p></div></Col>
            <Col md={4}><div className="card-min info-tile"><span className="tile-icon"><FiFileText aria-hidden="true" /></span><h4>Permits + docs</h4><p>Coordinated drawing progress and permit package management.</p></div></Col>
            <Col md={4}><div className="card-min info-tile"><span className="tile-icon"><FiTool aria-hidden="true" /></span><h4>Field execution</h4><p>Schedule control, quality checkpoints, and transparent updates.</p></div></Col>
          </Row>
          <div className="section-actions">
            <Link className="btn-main" to="/contact">Discuss a project</Link>
          </div>
        </Container>
      </section>
    </>
  );
}

export default ServicesDesignBuildPage;
