import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiActivity, FiGitBranch } from 'react-icons/fi';
import PageHero from '../components/PageHero';

function InvestorsOverviewPage() {
  return (
    <>
      <PageHero eyebrow="Investors" title="Infill projects with disciplined underwriting." subtitle="Strategy, process, reporting cadence, and alignment from sourcing to exit/refi." />
      <section className="section section--alt">
        <Container>
          <div className="section-header page-copy inner-intro">
            <p>We structure investor communication to be concise, timely, and tied to execution milestones.</p>
          </div>
          <div className="card-min page-stack info-tile">
            <div>
              <span className="tile-icon"><FiGitBranch aria-hidden="true" /></span>
              <h4>Process</h4>
              <p>Sourcing → Feasibility → Permits → Build → Exit / Refinance.</p>
            </div>
            <div>
              <span className="tile-icon"><FiActivity aria-hidden="true" /></span>
              <h4>Reporting cadence</h4>
              <p>Regular progress updates, budget snapshots, and risk callouts in plain language.</p>
            </div>
            <div className="section-actions" style={{ marginTop: 0 }}>
              <Link className="btn-main" to="/projects">See active / past projects</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default InvestorsOverviewPage;
