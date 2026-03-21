import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#investors', label: 'Investors' },
    { href: '#projects', label: 'Projects' },
    { href: '#homeowners', label: 'Homeowners' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (event, selector) => {
    event.preventDefault();
    const target = document.querySelector(selector);
    setExpanded(false);

    if (!target) {
      return;
    }

    const offset = 92;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <Navbar expand="lg" fixed="top" expanded={expanded} onToggle={setExpanded} className="site-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-wrap" onClick={() => setExpanded(false)}>
          <img src={`${import.meta.env.BASE_URL}assets/logo/westwood-logo-v2-transparent.png`} alt="Westwood Homes logo" className="brand-logo" />
          <span className="brand-name">Westwood Homes</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="site-nav" className="site-toggler" />
        <Navbar.Collapse id="site-nav">
          <Nav className="ms-auto align-items-lg-center">
            {links.map((item) => (
              <Nav.Link
                key={item.href}
                href={item.href}
                className="site-link"
                onClick={(event) => scrollToSection(event, item.href)}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
