import React from "react";
import "./About.css";
import Image from "../../assets/images/Git.jpeg";
import { profile } from "../../utils/profile";

const About = () => (
  <section className="about" id="about">
    <div className="row">
      <div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-img">
        <img
          src={Image}
          alt={`${profile.name}, ${profile.role}`}
          width="400"
          height="500"
          loading="lazy"
        />
      </div>
      <div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-content">
        <h2>About me</h2>
        <p>{profile.bio}</p>
      </div>
    </div>
  </section>
);

export default About;
