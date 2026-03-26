import { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import siteContent from '../../data/siteContent.json';
import { sendInquiry } from '../../utils/sendInquiry';
import './Footer.css';

function Footer() {
  const { contact } = siteContent;
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, message: '' });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus({ loading: true, message: '' });
    try {
      await sendInquiry({
        source: 'General Contact',
        ...form,
      });
      setSubmitStatus({ loading: false, message: 'Sent successfully. We will follow up soon.' });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        loading: false,
        message: error.message || 'Unable to send right now.',
      });
    }
  };


  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div>
            <h4>Westwood Homes</h4>
          </div>
          <div>
            <h5>Navigate</h5>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#investors">Investors</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#homeowners">Homeowners</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>

        <div id="contact" className="footer-contact">
          <h3 className="footer-contact-title">Contact</h3>
          <p className="footer-contact-deck">
            Tell us about your project goals and timeline. We will follow up shortly.
          </p>

          <Row className="g-4 footer-contact-row">
            <Col lg={7}>
              <Form className="footer-contact-form" onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={7}>
                    <Form.Group>
                      <Form.Label>
                        Phone{' '}
                        <span className="footer-contact-optional">(optional)</span>
                      </Form.Label>
                      <Form.Control
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="footer-contact-actions">
                  <button className="btn-main" type="submit" disabled={submitStatus.loading}>
                    {submitStatus.loading ? 'Sending...' : 'Send inquiry'}
                  </button>
                </div>
                {submitStatus.message ? (
                  <p className="footer-contact-feedback">{submitStatus.message}</p>
                ) : null}
              </Form>
            </Col>

            <Col lg={5}>
              <div className="footer-contact-aside">
                <div className="footer-contact-aside-block">
                  <span className="footer-contact-kicker">Phone</span>
                  <div className="footer-contact-line">
                    <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
                  </div>
                </div>
                <div className="footer-contact-aside-block">
                  <span className="footer-contact-kicker">Email</span>
                  <div className="footer-contact-line">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                </div>
                <div className="footer-contact-aside-block footer-contact-aside-block--office">
                  <span className="footer-contact-kicker">Office</span>
                  <div className="footer-contact-line footer-contact-line--office">
                    <a
                      href={contact.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="footer-contact-address"
                    >
                      {contact.addressFull}
                    </a>
                    <a
                      href={contact.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-main footer-contact-directions"
                    >
                      Get directions
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="footer-bottom">© {new Date().getFullYear()} Westwood Homes</div>
      </Container>
    </footer>
  );
}

export default Footer;
