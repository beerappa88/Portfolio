import {
  FcAbout,
  FcBiotech,
  FcBusinessContact,
  FcHome,
  FcPortraitMode,
  FcReadingEbook,
  FcVideoProjector,
} from "react-icons/fc";

/**
 * `to` must match the `id` on the corresponding section element —
 * react-scroll resolves the target by DOM id, not by route.
 */
export const navLinks = [
  { _id: 1, to: "home", label: "Home", icon: FcHome },
  { _id: 2, to: "about", label: "About", icon: FcAbout },
  { _id: 3, to: "education", label: "Education", icon: FcReadingEbook },
  { _id: 4, to: "techstack", label: "Tech Stack", icon: FcBiotech },
  { _id: 5, to: "projects", label: "Projects", icon: FcVideoProjector },
  { _id: 6, to: "work", label: "Work Experience", icon: FcPortraitMode },
  { _id: 7, to: "contact", label: "Contact", icon: FcBusinessContact },
];

// Shared react-scroll behaviour, so all three nav renderings stay in step.
export const SCROLL_PROPS = {
  spy: true,
  smooth: true,
  offset: -100,
  duration: 100,
};
