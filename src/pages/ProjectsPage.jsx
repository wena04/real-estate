import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageHero from '../components/PageHero';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects.json';
import locations from '../data/locations.json';
import './ProjectsPage.css';

const LazyProjectMap = lazy(() => import('../components/ProjectMap'));

function ProjectsPage() {
  const [activeProgram, setActiveProgram] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [selectedSlug, setSelectedSlug] = useState('');
  const [mapVisible, setMapVisible] = useState(false);
  const mapSectionRef = useRef(null);

  const programFilters = useMemo(() => ['All', ...new Set(projects.map((p) => p.program))], []);
  const statusFilters = useMemo(() => ['All', ...new Set(projects.map((p) => p.status))], []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const programPass = activeProgram === 'All' || project.program === activeProgram;
      const statusPass = activeStatus === 'All' || project.status === activeStatus;
      return programPass && statusPass;
    });
  }, [activeProgram, activeStatus]);

  const filteredPoints = useMemo(() => {
    const projectSlugs = new Set(filteredProjects.map((project) => project.slug));
    return locations.filter((point) => projectSlugs.has(point.slug));
  }, [filteredProjects]);

  useEffect(() => {
    const target = mapSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!filteredPoints.some((point) => point.slug === selectedSlug)) {
      setSelectedSlug('');
    }
  }, [filteredPoints, selectedSlug]);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Selected work."
        subtitle="Interactive map, program/status filters, and project details designed for fast browsing."
      />

      <section className="section section--alt">
        <Container>
          <div className="filter-panel">
            <div className="filter-head">
              <h3>Browse the portfolio map</h3>
              <p>Filter by program or status, then hover cards or click pins to inspect each site.</p>
            </div>

            <div className="filter-block">
              <div className="meta-line filter-label">Filter by program</div>
              <div className="filter-row">
                {programFilters.map((program) => (
                  <button
                    key={program}
                    className={`filter-chip ${activeProgram === program ? 'is-active' : ''}`}
                    onClick={() => setActiveProgram(program)}
                    type="button"
                  >
                    {program}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-block">
              <div className="meta-line filter-label">Filter by status</div>
              <div className="filter-row">
                {statusFilters.map((status) => (
                  <button
                    key={status}
                    className={`filter-chip ${activeStatus === status ? 'is-active' : ''}`}
                    onClick={() => setActiveStatus(status)}
                    type="button"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-toolbar">
              <div className="projects-results-meta">
                Showing {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}
              </div>
              <button
                type="button"
                className="btn-ghost filter-reset-btn"
                onClick={() => {
                  setActiveProgram('All');
                  setActiveStatus('All');
                  setSelectedSlug('');
                }}
              >
                Reset filters
              </button>
            </div>

            <div ref={mapSectionRef}>
              <div className="projects-map-head">
                <h3>Project map</h3>
                <p>Click a marker for project details. Selected site syncs with the list below.</p>
              </div>
              {mapVisible ? (
                <Suspense fallback={<div className="card-min map-placeholder">Loading map…</div>}>
                  <LazyProjectMap points={filteredPoints} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
                </Suspense>
              ) : (
                <div className="card-min map-placeholder">Map loads when this section comes into view to keep page speed fast.</div>
              )}
            </div>
          </div>

          {filteredProjects.length ? (
            <Row className="g-3" style={{ marginTop: '0.45rem' }}>
              {filteredProjects.map((project) => (
                <Col md={6} lg={4} key={project.slug}>
                  <div
                    onMouseEnter={() => setSelectedSlug(project.slug)}
                    className={`project-result-card ${selectedSlug === project.slug ? 'is-active' : ''}`}
                  >
                    <ProjectCard project={project} />
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="card-min no-results-card">
              <h4>No projects match these filters.</h4>
              <p>Try resetting filters to see the full list.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export default ProjectsPage;
