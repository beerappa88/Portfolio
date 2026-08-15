import { BsFiletypeHtml, BsFiletypeCss, BsBootstrap } from "react-icons/bs";
import { FaNodeJs, FaDocker, FaAws } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import { SiRedis, SiApachespark } from "react-icons/si";
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiMongodb,
  SiMysql,
  SiGithub,
  SiFirebase,
  SiExpress,
  SiFastapi,
  SiPostgresql,
} from "react-icons/si";
import { FaCuttlefish } from "react-icons/fa";

export const TechstackList = [
  // Programming Languages
  {
    _id: 1,
    name: "C",
    icon: FaCuttlefish,
  },
  {
    _id: 2,
    name: "C++",
    icon: TbBrandCpp,
  },
  {
    _id: 3,
    name: "Python",
    icon: SiPython,
  },
  {
    _id: 4,
    name: "JavaScript",
    icon: SiJavascript,
  },

  // Frontend
  {
    _id: 5,
    name: "HTML",
    icon: BsFiletypeHtml,
  },
  {
    _id: 6,
    name: "CSS / SCSS",
    icon: BsFiletypeCss,
  },
  {
    _id: 7,
    name: "Bootstrap",
    icon: BsBootstrap,
  },
  {
    _id: 8,
    name: "React JS",
    icon: SiReact,
  },
  // Backend
  {
    _id: 9,
    name: "Node.js",
    icon: FaNodeJs,
  },
  {
    _id: 10,
    name: "Express.js",
    icon: SiExpress,
  },
  {
    _id: 11,
    name: "FastAPI",
    icon: SiFastapi,
  },

  // Databases
  {
    _id: 12,
    name: "MongoDB",
    icon: SiMongodb,
  },
  {
    _id: 13,
    name: "MySQL",
    icon: SiMysql,
  },
  {
    _id: 14,
    name: "Firebase",
    icon: SiFirebase,
  },
  {
    _id: 15,
    name: "PostgreSQL",
    icon: SiPostgresql,
  },
  {
    _id: 16,
    name: "Redis",
    icon: SiRedis,
  },

  // Data & Cloud
  {
    _id: 17,
    name: "PySpark",
    icon: SiApachespark,
  },
  {
    _id: 18,
    name: "AWS",
    icon: FaAws,
  },

  // Tools & DevOps
  {
    _id: 19,
    name: "Git / GitHub",
    icon: SiGithub,
  },
  {
    _id: 20,
    name: "Docker",
    icon: FaDocker,
  },
];
