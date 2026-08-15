import React, { useEffect, useRef, useState } from "react";
import "./Reveal.css";

/**
 * Animates children in when they scroll into view.
 *
 * Replaces react-reveal, which was unmaintained since 2019 and relied on
 * legacy UNSAFE_ lifecycles and findDOMNode — noisy under React 18 StrictMode.
 * This does the same job with an IntersectionObserver and CSS keyframes, and
 * respects prefers-reduced-motion (handled globally in index.css).
 *
 * @param animation - "spin" | "fade-up" | "fade-left" | "zoom"
 * @param delay - ms to stagger this item behind its siblings
 */
const Reveal = ({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
}) => {
  const ref = useRef(null);
  // Fail open: if IntersectionObserver is unavailable the content must still
  // be visible, never left stuck at opacity 0.
  const [visible, setVisible] = useState(
    typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect(); // animate once, not on every scroll past
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${animation}${visible ? " is-visible" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
