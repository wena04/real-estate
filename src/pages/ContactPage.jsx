import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import siteContent from '../data/siteContent.json';
import './ContactPage.css';

function ContactPage() {
  const { contact } = siteContent;
  const [copiedField, setCopiedField] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const resetTimerRef = useRef(null);
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(contact.addressFull)}&output=embed`;

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async (fieldKey, value) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopiedField(fieldKey);
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = setTimeout(() => setCopiedField(''), 1600);
    } catch {
      setCopiedField('');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get In Touch"
        subtitle="Ready to start your next project? We would love to hear from you."
      />
      <section id="contact" className="section section--alt">
        <Container>
          <Row className="g-3 g-lg-4 contact-layout">
            <Col lg={7}>
              <Form
                className="contact-form-card"
                onSubmit={(event) => {
                  event.preventDefault();
                  alert('Placeholder form submitted. Connect to backend/email service in production.');
                }}
              >
                <h3>Let's Build Something Together</h3>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Full name</Form.Label>
                      <Form.Control name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" required />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control name="phone" value={formData.phone} onChange={handleChange} placeholder="(425) 123-4567" />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <button className="btn-main contact-submit-btn" type="submit">Send message</button>
              </Form>
            </Col>

            <Col lg={5}>
              <aside className="contact-info-panel">
                <h3>Contact Information</h3>
                <p>
                  Have a question or want to discuss a project? Reach out directly and we will get back to you promptly.
                </p>

                <div className="contact-info-item">
                  <FiMapPin aria-hidden="true" />
                  <div>
                    <div className="contact-info-label">Office</div>
                    <a className="contact-info-link" href={contact.mapUrl} target="_blank" rel="noreferrer">{contact.addressFull}</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <FiMail aria-hidden="true" />
                  <div>
                    <div className="contact-info-label">Email</div>
                    <div className="contact-link-row">
                      <a className="contact-info-link" href={`mailto:${contact.email}`}>{contact.email}</a>
                      <button className="contact-copy-btn" type="button" onClick={() => handleCopy('email', contact.email)}>
                        {copiedField === 'email' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <FiPhone aria-hidden="true" />
                  <div>
                    <div className="contact-info-label">Phone</div>
                    <div className="contact-link-row">
                      <a className="contact-info-link" href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
                      <button className="contact-copy-btn" type="button" onClick={() => handleCopy('phone', contact.phone)}>
                        {copiedField === 'phone' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="contact-map-wrap">
                  <iframe
                    title="Westwood Homes office map"
                    src={mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a className="contact-map-cta" href={contact.mapUrl} target="_blank" rel="noreferrer">
                    Get directions <span aria-hidden="true">→</span>
                  </a>
                </div>
              </aside>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default ContactPage;
