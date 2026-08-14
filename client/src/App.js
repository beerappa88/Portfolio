import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Education from "./pages/Educations/Education";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Techstack from "./pages/Techstack/Techstack";
import WorkExp from "./pages/workExp/WorkExp";
import ScrollToTop from "react-scroll-to-top";
import MobileNav from "./components/MobileNav/MobileNav";
import Sidebar from "./components/Sidebar/Sidebar";
import { profile } from "./utils/profile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ToastContainer />
      <MobileNav />
      <Sidebar />
      <main id="main">
        <Home />
        <div className="container">
          <About />
          <Education />
          <Techstack />
          <Projects />
          <WorkExp />
          <Contact />
        </div>
      </main>
      <footer className="footer pb-3">
        <p className="text-center">
          Made By 😍 {profile.name} &copy; {new Date().getFullYear()}
        </p>
      </footer>
      <ScrollToTop smooth color="#f29f67" className="scroll-to-top" />
    </>
  );
}

export default App;
