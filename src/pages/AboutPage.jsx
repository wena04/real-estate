import { Container, Row, Col } from 'react-bootstrap';
import PageHero from '../components/PageHero';

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Local team. Builder mindset. Developer discipline." subtitle="We combine practical construction execution with disciplined development process." />
      <section className="section section--alt">
        <Container>
          <Row className="g-3">
            <Col md={4}><div className="card-min"><h4>Mission</h4><p>Create durable infill housing with predictable execution and transparent communication.</p></div></Col>
            <Col md={4}><div className="card-min"><h4>How we work</h4><p>Source → Feasibility → Permits → Build → Closeout, with owner-level reporting throughout.</p></div></Col>
            <Col md={4}><div className="card-min"><h4>Team</h4><p>Short bios and roles can be added once client finalizes headshots and copy.</p></div></Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AboutPage;
