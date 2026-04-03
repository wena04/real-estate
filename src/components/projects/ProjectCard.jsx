import './ProjectCard.css';

function ProjectCard({ project }) {
  const imageSrc = `${import.meta.env.BASE_URL}${String(project.coverImage || '').replace(/^\/+/, '')}`;
  const title = project.cardTagline || project.displayName;

  return (
    <article className="card-min project-card">
      <div className="project-card-image-wrap">
        <img
          src={imageSrc}
          alt={title}
          className="project-card-image"
        />
      </div>
      <h4 className="project-card-title project-card-title--accent">{title}</h4>
    </article>
  );
}

export default ProjectCard;
