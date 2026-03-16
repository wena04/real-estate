import { useState } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import PageHero from '../components/PageHero';

function InvestorsJoinPage() {
  const [formData, setFormData] = useState({ name: '', email: '', accredited: '', checkSize: '', preference: '', timeline: '' });
  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <>
      <PageHero eyebrow="Investors" title="Get first look at Westwood opportunities." subtitle="Join our investor list for deal announcements and project updates." />
      <section className="section section--alt">
        <Container>
          <div className="section-header page-copy inner-intro">
            <p>Tell us your check size and preferred deal profile so we can share relevant opportunities first.</p>
          </div>
          <Form className="card-min form-card" onSubmit={(e) => { e.preventDefault(); alert('Placeholder form submitted. Connect this form in production.'); }}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Accredited (optional)</Form.Label>
                  <Form.Select name="accredited" value={formData.accredited} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Target check size</Form.Label>
                  <Form.Control name="checkSize" value={formData.checkSize} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Timeline</Form.Label>
                  <Form.Control name="timeline" value={formData.timeline} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Return preference</Form.Label>
                  <Form.Control name="preference" value={formData.preference} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <div className="section-actions">
              <button className="btn-main" type="submit">Join list</button>
            </div>
          </Form>
        </Container>
      </section>
    </>
  );
}

export default InvestorsJoinPage;
