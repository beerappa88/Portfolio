import React from "react";
import { SiReact } from "react-icons/si";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./WorkExp.css";
import TimelineItem from "../../components/Timeline/TimelineItem";
import { workExperience } from "../../utils/work";

const WorkExp = () => (
  <section className="work" id="work">
    <div className="container work-exp">
      <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
        Work Experience
      </h2>
      <hr />
      <VerticalTimeline lineColor="var(--timeline-line)">
        {workExperience.map((role) => (
          <TimelineItem
            key={role._id}
            date={role.date}
            title={role.title}
            subtitle={role.subtitle}
            points={role.points}
            icon={<SiReact aria-hidden="true" />}
            iconColor="var(--ink)"
          />
        ))}
      </VerticalTimeline>
    </div>
  </section>
);

export default WorkExp;
