import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

/**
 * Shared wrapper for Education and Work Experience entries.
 * Colours come from CSS custom properties (see index.css) rather than the
 * hardcoded inline literals these styles used to repeat five times over.
 */
const CONTENT_STYLE = {
  background: "var(--surface)",
  color: "var(--text)",
  boxShadow: "var(--shadow-card)",
};

const ARROW_STYLE = { borderRight: "7px solid var(--surface)" };

const TimelineItem = ({ date, icon, iconColor, title, subtitle, points }) => (
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={CONTENT_STYLE}
    contentArrowStyle={ARROW_STYLE}
    date={date}
    iconStyle={{ background: iconColor, color: "#fff" }}
    icon={icon}
  >
    <h3 className="vertical-timeline-element-title">{title}</h3>
    <p className="vertical-timeline-element-subtitle">{subtitle}</p>
    {points && (
      <ul className="timeline-points">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    )}
  </VerticalTimelineElement>
);

export default TimelineItem;
