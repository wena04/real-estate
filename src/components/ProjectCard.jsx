import './ProjectCard.css';

function ProjectCard({ project }) {
  const imageSrc = `${import.meta.env.BASE_URL}${String(project.coverImage || '').replace(/^\/+/, '')}`;
  const hoverCopy =
    project.status === 'Completed'
      ? 'Completed and delivered'
      : project.status === 'Construction'
        ? 'Active construction progress'
        : project.status === 'Permitting'
          ? 'In permitting and agency coordination'
          : 'Feasibility and planning in progress';

  return (
    <article className="card-min project-card">
      <div className="project-card-image-wrap">
        <img
          src={imageSrc}
          alt={project.displayName}
          className="project-card-image"
        />
        <div className="project-card-overlay">
          <div className="project-card-overlay-inner">
            <h5>{project.displayName}</h5>
            <p>{hoverCopy}</p>
          </div>
        </div>
      </div>
      <div className="meta-line">{project.program} · {project.status}</div>
      <h4 className="project-card-title">{project.displayName}</h4>
      <p>{project.city}</p>
    </article>
  );
}

export default ProjectCard;
