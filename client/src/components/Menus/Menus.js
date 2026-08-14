import React from "react";
import "./Menus.css";
import NavLinks from "../NavLinks/NavLinks";
import Image from "../../assets/images/profile.jpg";
import { profile } from "../../utils/profile";

const Menus = ({ toggle }) => (
  <nav className="sidebar-nav" aria-label="Main">
    {toggle && (
      <div className="navbar-profile-pic">
        <img
          src={Image}
          alt={profile.name}
          width="180"
          height="180"
          loading="lazy"
        />
      </div>
    )}
    <NavLinks showLabels={toggle} />
  </nav>
);

export default Menus;
