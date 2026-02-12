import { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section section-padding bg-sage">
      <Container>
        <div className="fade-in-section">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p>
              Ready to start your next project? We'd love to hear from you.
            </p>
          </div>
        </div>

        <Row>
          <Col lg={7} className="fade-in-section">
            <div className="contact-form-wrapper">
              <h3>Let's Build Something Together</h3>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="custom-input"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    required
                    className="custom-input"
                  />
                </Form.Group>
                <button type="submit" className="btn-primary-custom">
                  Send Message
                </button>
              </Form>
            </div>
          </Col>

          <Col lg={5} className="fade-in-section">
            <div className="contact-info-wrapper">
              <h3>Contact Information</h3>
              <p className="contact-info-text">
                Have a question or want to discuss a project? Reach out
                directly or fill out the form and we'll get back to you
                promptly.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <FiMapPin />
                  </div>
                  <div>
                    <h5>Office</h5>
                    <p>1530 140th Ave NE, Ste 117<br />Bellevue, WA 98005</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <FiMail />
                  </div>
                  <div>
                    <h5>Email</h5>
                    <p>
                      <a href="mailto:cindy@westwoodnw.com">
                        cindy@westwoodnw.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <FiPhone />
                  </div>
                  <div>
                    <h5>Phone</h5>
                    <p>
                      <a href="tel:+14255551234">(425) 555-1234</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-map-placeholder">
                <iframe
                  title="Westwood Homes Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.5!2d-122.1564!3d47.6205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDM3JzEzLjgiTiAxMjLCsDA5JzIzLjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
