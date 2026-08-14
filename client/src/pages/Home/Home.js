import React from "react";
import { useTheme } from "../../context/ThemeContext";
import Typewriter from "typewriter-effect";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import "./home.css";
import { profile } from "../../utils/profile";

const Home = () => {
  const [theme, setTheme] = useTheme();

  const handleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <section className="container-fluid home-container" id="home">
      <button
        type="button"
        className="theme-btn"
        onClick={handleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        aria-pressed={theme === "dark"}
      >
        {theme === "light" ? (
          <BsFillMoonStarsFill size={30} aria-hidden="true" />
        ) : (
          <BsFillSunFill size={30} aria-hidden="true" />
        )}
      </button>

      <div className="container home-content">
        <p className="home-greeting">Hi 👋 I'm a</p>
        <h1>
          <Typewriter
            options={{
              strings: profile.headlines,
              autoStart: true,
              loop: true,
            }}
          />
        </h1>

        <div className="home-buttons">
          <a
            className="btn btn-hire"
            href={`https://wa.me/${profile.whatsapp}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Hire Me
          </a>
          {/* Served from public/ so the 190 KB PDF is fetched on click
              rather than pulled into the JS bundle graph. */}
          <a
            className="btn btn-cv"
            href={`${process.env.PUBLIC_URL}/resume.pdf`}
            download={profile.resumeFileName}
          >
            My Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
