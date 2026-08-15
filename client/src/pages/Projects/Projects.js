import React from "react";
import "./Projects.css";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Reveal from "../../components/Reveal/Reveal";
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
      {projects.map((project, index) => (
        <div className="col-md-4 mb-4" key={project._id}>
          {/* Stagger by column so the row flips in sequence rather than
              all six cards spinning at once. */}
          <Reveal animation="spin" delay={(index % 3) * 120}>
            <ProjectCard project={project} />
          </Reveal>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
