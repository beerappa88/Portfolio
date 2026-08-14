import React from "react";
import { Link } from "react-scroll";
import { navLinks, SCROLL_PROPS } from "../../utils/navLinks";

/**
 * The one nav list, shared by the desktop sidebar (expanded and collapsed)
 * and the mobile menu — previously this markup existed in three places.
 *
 * `showLabels={false}` renders icon-only links, so each still carries an
 * aria-label; otherwise the accessible name would be an empty SVG.
 */
const NavLinks = ({ showLabels = true, onNavigate }) => (
  <ul className="nav-items">
    {navLinks.map(({ _id, to, label, icon: Icon }) => (
      <li key={_id} className="nav-link">
        <Link
          to={to}
          href={`#${to}`}
          {...SCROLL_PROPS}
          onClick={onNavigate}
          aria-label={showLabels ? undefined : label}
          title={showLabels ? undefined : label}
        >
          <Icon aria-hidden="true" focusable="false" />
          {showLabels && <span>{label}</span>}
        </Link>
      </li>
    ))}
  </ul>
);

export default NavLinks;
