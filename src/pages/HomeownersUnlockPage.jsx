import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiHome, FiUsers } from 'react-icons/fi';
import PageHero from '../components/PageHero';

function HomeownersUnlockPage() {
  return (
    <>
      <PageHero
        eyebrow="Homeowners"
        title="You may be sitting on more value than you think."
        subtitle="We review your lot potential and lay out realistic paths: partner, sell, or build and keep."
      />
      <section className="section section--alt">
        <Container>
          <div className="section-header page-copy">
            <p>
              We start with a practical lot review and then map options around your timeline, risk tolerance, and long-term goals.
            </p>
          </div>
          <Row className="g-4">
            <Col md={6}>
              <div className="card-min info-tile">
                <span className="tile-icon"><FiHome aria-hidden="true" /></span>
                <h4>What we can build</h4>
                <ul className="list-clean">
                  <li>ADU / DADU</li>
                  <li>Cottages</li>
                  <li>Townhomes</li>
                  <li>Small multiplex (where zoning allows)</li>
                </ul>
              </div>
            </Col>
            <Col md={6}>
              <div className="card-min info-tile">
                <span className="tile-icon"><FiUsers aria-hidden="true" /></span>
                <h4>Paths to partner</h4>
                <ul className="list-clean">
                  <li>Joint venture</li>
                  <li>Sell directly</li>
                  <li>Build + keep (rental/BTR)</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section">
        <Container>
          <div className="card-min page-copy page-stack info-tile">
            <div>
              <h3>What we evaluate</h3>
              <p>Zoning, lot geometry, access and parking, utilities, trees/ECA, stormwater, and slope constraints.</p>
            </div>
            <div className="section-actions" style={{ marginTop: 0 }}>
              <Link className="btn-main" to="/homeowners/feasibility-review">Get a feasibility review</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default HomeownersUnlockPage;
