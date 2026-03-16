import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import siteContent from '../data/siteContent.json';
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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/homeowners/feasibility-review">Feasibility Review</Link></li>
              <li><Link to="/investors/join">Join Investor List</Link></li>
              <li><Link to="/contact">Contact</Link></li>
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
