import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

function Footer() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section">
      <Container>
        <Row className="footer-main">
          <Col lg={4} md={6} className="footer-brand-col">
            <h3 className="footer-brand">
              Westwood <span>Homes</span>
            </h3>
            <p className="footer-tagline">
              Built local. Built with care. Built to last — creating places
              where life unfolds.
            </p>
          </Col>

          <Col lg={2} md={6} className="footer-links-col">
            <h5 className="footer-heading">Navigate</h5>
            <ul className="footer-links">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={3} md={6} className="footer-contact-col">
            <h5 className="footer-heading">Contact</h5>
            <ul className="footer-contact-list">
              <li>1530 140th Ave NE, Ste 117</li>
              <li>Bellevue, WA 98005</li>
              <li>
                <a href="mailto:cindy@westwoodnw.com">cindy@westwoodnw.com</a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="footer-cta-col">
            <h5 className="footer-heading">Start a Project</h5>
            <p className="footer-cta-text">
              Ready to build your dream home? Let's talk.
            </p>
            <a
              href="#contact"
              className="btn-outline-custom footer-cta-btn"
              onClick={(e) => handleScroll(e, '#contact')}
            >
              Get In Touch
            </a>
          </Col>
        </Row>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Westwood Homes. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
