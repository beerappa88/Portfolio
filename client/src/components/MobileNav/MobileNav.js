import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMenuFold } from "react-icons/ai";
import "./MobileNav.css";
import NavLinks from "../NavLinks/NavLinks";
import { profile } from "../../utils/profile";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((prev) => !prev);
  const handleMenuClick = () => setOpen(false);

  const Icon = open ? AiOutlineMenuFold : GiHamburgerMenu;

  return (
    <header className="mobile-nav">
      <div className="mobile-nav-header">
        <button
          type="button"
          className="mobile-nav-icon"
          onClick={handleOpen}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          <Icon size={30} aria-hidden="true" focusable="false" />
        </button>

        <span className="mobile-nav-title">{profile.name}</span>
      </div>
      {open && (
        <div className="mobile-nav-menu" id="mobile-nav-menu">
          <NavLinks onNavigate={handleMenuClick} />
        </div>
      )}
    </header>
  );
};

export default MobileNav;
