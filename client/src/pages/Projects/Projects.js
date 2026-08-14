import React from "react";
import "./Projects.css";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { projects } from "../../utils/projects";

const Projects = () => (
  <section className="container project" id="projects">
    <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
      Top Recent Projects
    </h2>
    <hr />
    <p className="pb-3 text-center">
      A selection of things I've designed, built and shipped — full-stack
      products and front-end builds.
    </p>

    <div className="row" id="ads">
      {projects.map((project) => (
        <div className="col-md-4 mb-4" key={project._id}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
