import React from "react";
import "./Techstack.css";
import { TechstackList } from "../../utils/TechstackList";

const Techstack = () => (
  <section className="container techstack" id="techstack">
    <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
      Technologies Stack
    </h2>
    <hr />
    <p className="pb-3 text-center">
      👉 including programming languages, frameworks, databases, front-end and
      back-end tools, and APIs
    </p>
    <ul className="row tech-list">
      {TechstackList.map((tech) => (
        <li key={tech._id} className="col-md-3">
          <div className="card m-2">
            <div className="card-content">
              <div className="card-body">
                <div className="media d-flex justify-content-center align-items-center">
                  <tech.icon className="tech-icon" aria-hidden="true" />
                  <div className="media-body">
                    <h3 className="h5 mb-0">{tech.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default Techstack;
