import { useState } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { FiClipboard } from 'react-icons/fi';
import PageHero from '../components/PageHero';

function HomeownersFeasibilityPage() {
  const [formData, setFormData] = useState({ address: '', photos: '', goal: '', timing: '', email: '' });
  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <>
      <PageHero eyebrow="Feasibility Review" title="Feasibility review in plain English." subtitle="Submit address, goals, and timeline. We return options and constraints quickly." />
      <section className="section section--alt">
        <Container>
          <div className="section-header page-copy inner-intro">
            <p>Share what you know now. Even partial information is enough for a first-pass recommendation.</p>
          </div>
          <Row className="g-4">
            <Col lg={5}>
              <div className="card-min page-stack info-tile">
                <div>
                  <span className="tile-icon"><FiClipboard aria-hidden="true" /></span>
                  <h4>What you get</h4>
                  <ul className="list-clean">
                    <li>Concept options and likely yield</li>
                    <li>Constraint flags and risks</li>
                    <li>Recommended next step</li>
                  </ul>
                </div>
                <p style={{ marginBottom: 0 }}>Typical initial response target: 1-3 business days.</p>
              </div>
            </Col>
            <Col lg={7}>
              <Form className="card-min form-card" onSubmit={(e) => { e.preventDefault(); alert('Placeholder form submitted. Connect to a form backend in production.'); }}>
                <Form.Group className="mb-3">
                  <Form.Label>Property address</Form.Label>
                  <Form.Control name="address" value={formData.address} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Photo links</Form.Label>
                  <Form.Control name="photos" value={formData.photos} onChange={handleChange} placeholder="Drive/Dropbox links" />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Goal</Form.Label>
                      <Form.Select name="goal" value={formData.goal} onChange={handleChange}>
                        <option value="">Select</option>
                        <option>Sell</option>
                        <option>Partner</option>
                        <option>Build and keep</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Timing</Form.Label>
                      <Form.Control name="timing" value={formData.timing} onChange={handleChange} placeholder="0-3 months, etc" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <button className="btn-main" type="submit">Submit property details</button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default HomeownersFeasibilityPage;
