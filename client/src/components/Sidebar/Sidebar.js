import React, { useState, useEffect } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import "./Sidebar.css";
import Menus from "../Menus/Menus";

/**
 * Fixed desktop sidebar. Hidden below the mobile breakpoint, where
 * MobileNav takes over.
 */
const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const handleToggle = () => setExpanded((prev) => !prev);

  // The sidebar is position:fixed, so every section offsets itself by its
  // width. Publishing that width as a custom property keeps the two in step —
  // collapsing used to leave a dead gutter because the offsets were static.
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      expanded ? "200px" : "90px"
    );
  }, [expanded]);

  return (
    <div className={expanded ? "sidebar sidebar-expanded" : "sidebar"}>
      <div className="sidebar-toggle-icons">
        <button
          type="button"
          onClick={handleToggle}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={expanded}
        >
          {expanded ? (
            <AiOutlineDoubleLeft size={30} aria-hidden="true" />
          ) : (
            <AiOutlineDoubleRight size={30} aria-hidden="true" />
          )}
        </button>
      </div>
      <Menus toggle={expanded} />
    </div>
  );
};

export default Sidebar;
