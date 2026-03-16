import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiZap } from 'react-icons/fi';
import PageHero from '../components/PageHero';

function HomeownersSellPage() {
  return (
    <>
      <PageHero eyebrow="Homeowners" title="Sell with clarity—on your timeline." subtitle="Choose the path that best fits your goals: market exposure or direct speed." />
      <section className="section">
        <Container>
          <div className="section-header page-copy inner-intro">
            <p>We help you compare options side-by-side so you can choose based on certainty, price target, and timeline.</p>
          </div>
          <Row className="g-3">
            <Col md={6}>
              <div className="card-min info-tile">
                <span className="tile-icon"><FiTrendingUp aria-hidden="true" /></span>
                <h4>Market listing</h4>
                <p>Maximum exposure and pricing support with guided positioning.</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="card-min info-tile">
                <span className="tile-icon"><FiZap aria-hidden="true" /></span>
                <h4>Direct offer</h4>
                <p>Speed and certainty with flexible close timing and fewer moving parts.</p>
              </div>
            </Col>
          </Row>
          <div className="section-actions">
            <Link className="btn-main" to="/contact">Request an offer / talk to us</Link>
          </div>
        </Container>
      </section>
    </>
  );
}

export default HomeownersSellPage;
