import React from "react";

const ProjectCard = ({ project }) => {
  const { title, category, tags, url, image, description } = project;

  return (
    <article className="card rounded h-100">
      <div className="card-image">
        <span className="card-notify-badge">{category}</span>
        <img
          src={image}
          alt={`Screenshot of ${title}`}
          width="600"
          height="400"
          loading="lazy"
        />
      </div>
      <div className="card-image-overly m-auto mt-3">
        {tags.map((tag) => (
          <span key={tag} className="card-detail-badge">
            {tag}
          </span>
        ))}
      </div>
      <div className="card-body text-center">
        <div className="ad-title m-auto">
          <h3 className="h5 text-uppercase">{title}</h3>
        </div>
        <p className="card-description">{description}</p>
        <a
          className="ad-btn"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View<span className="visually-hidden"> {title}</span>
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;
