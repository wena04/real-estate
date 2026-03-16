import { useMemo, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const isHomeowners = useMemo(() => location.pathname.startsWith('/homeowners'), [location.pathname]);
  const isServices = useMemo(() => location.pathname.startsWith('/services'), [location.pathname]);
  const isInvestors = useMemo(() => location.pathname.startsWith('/investors'), [location.pathname]);

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
            <Nav.Link as={NavLink} to="/" onClick={() => setExpanded(false)} className="site-link">Home</Nav.Link>

            <NavDropdown title="Homeowners" id="homeowners-nav" className={`site-dropdown ${isHomeowners ? 'active' : ''}`}>
              <NavDropdown.Item as={Link} to="/homeowners/unlock-lot" onClick={() => setExpanded(false)}>Unlock the Potential of Your Lot</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/homeowners/sell-home" onClick={() => setExpanded(false)}>Sell a Home</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/homeowners/feasibility-review" onClick={() => setExpanded(false)}>Feasibility Review</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Services" id="services-nav" className={`site-dropdown ${isServices ? 'active' : ''}`}>
              <NavDropdown.Item as={Link} to="/services/design-build" onClick={() => setExpanded(false)}>Design + Build</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/development-consulting" onClick={() => setExpanded(false)}>Development Consulting</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/construction-management" onClick={() => setExpanded(false)}>Construction Management</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Investors" id="investors-nav" className={`site-dropdown ${isInvestors ? 'active' : ''}`}>
              <NavDropdown.Item as={Link} to="/investors/join" onClick={() => setExpanded(false)}>Join Investor List</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/investors/overview" onClick={() => setExpanded(false)}>Investor Overview</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/projects" onClick={() => setExpanded(false)} className="site-link">Projects</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={() => setExpanded(false)} className="site-link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
