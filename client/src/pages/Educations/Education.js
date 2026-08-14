import React from "react";
import { MdSchool } from "react-icons/md";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./Education.css";
import TimelineItem from "../../components/Timeline/TimelineItem";
import { education } from "../../utils/education";

const Education = () => (
  <section className="education" id="education">
    <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
      Education Details
    </h2>
    <hr />
    <VerticalTimeline>
      {education.map((item) => (
        <TimelineItem
          key={item._id}
          date={item.date}
          title={item.title}
          subtitle={item.subtitle}
          icon={<MdSchool aria-hidden="true" />}
          iconColor="var(--accent)"
        />
      ))}
    </VerticalTimeline>
  </section>
);

export default Education;
