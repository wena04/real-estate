import { Container } from 'react-bootstrap';
import siteContent from '../../data/siteContent.json';
import './Footer.css';

function Footer() {
  const { contact } = siteContent;

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div>
            <h4>Westwood Homes</h4>
            <p>Builder mindset. Developer discipline.</p>
          </div>
          <div>
            <h5>Navigate</h5>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#homeowners">Homeowners</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#investors">Investors</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <p>
              <a href={contact.mapUrl} target="_blank" rel="noreferrer">
                {contact.addressFull}
              </a>
            </p>
            <p><a href={`tel:${contact.phoneHref}`}>{contact.phone}</a></p>
            <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          </div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} Westwood Homes</div>
      </Container>
    </footer>
  );
}

export default Footer;
