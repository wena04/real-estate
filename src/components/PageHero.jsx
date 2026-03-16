import { Container } from 'react-bootstrap';
import './PageHero.css';

function PageHero({ eyebrow, title, subtitle, action }) {
  return (
    <section className="page-hero section">
      <Container>
        <div className="page-hero-inner">
          {eyebrow ? <div className="meta-line page-hero-eyebrow">{eyebrow}</div> : null}
          <h1 className="page-hero-title">{title}</h1>
          <p className="page-hero-subtitle">{subtitle}</p>
          {action ? <div className="page-hero-action">{action}</div> : null}
        </div>
      </Container>
    </section>
  );
}

export default PageHero;
