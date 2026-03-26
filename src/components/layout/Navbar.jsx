import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
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

    if (selector === '#contact') {
      setActiveSection('#contact');
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      return;
    }

    const offset = 92;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    const resolveActiveSection = () => {
      const offset = 120;
      let current = '#home';

      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const contactInView = contactRect.top <= window.innerHeight * 0.65 && contactRect.bottom >= offset;
        const atPageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
        if (contactInView || atPageBottom) {
          setActiveSection((prev) => (prev === '#contact' ? prev : '#contact'));
          return;
        }
      }

      links.forEach((item) => {
        const section = document.querySelector(item.href);
        if (!section) {
          return;
        }

        const top = section.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY + offset >= top) {
          current = item.href;
        }
      });

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    resolveActiveSection();
    window.addEventListener('scroll', resolveActiveSection, { passive: true });
    window.addEventListener('resize', resolveActiveSection);

    return () => {
      window.removeEventListener('scroll', resolveActiveSection);
      window.removeEventListener('resize', resolveActiveSection);
    };
  }, []);

  return (
    <Navbar expand="lg" fixed="top" expanded={expanded} onToggle={setExpanded} className="site-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-wrap" onClick={() => setExpanded(false)}>
          <img src={`${import.meta.env.BASE_URL}assets/logo/westwood-logo-v2.png`} alt="Westwood Homes logo" className="brand-logo" />
          <span className="brand-name">Westwood Homes</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="site-nav" className="site-toggler" />
        <Navbar.Collapse id="site-nav">
          <Nav className="ms-auto align-items-lg-center" activeKey={activeSection}>
            {links.map((item) => (
              <Nav.Link
                key={item.href}
                eventKey={item.href}
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
