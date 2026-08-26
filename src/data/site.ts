export const site = {
  name: "Michael Zhu",
  title: "Firmware & Embedded Systems Engineer",
  shortTitle: "Firmware / Embedded Systems",
  school: "University of Waterloo",
  program: "B.A.Sc. Electrical & Computer Engineering",
  term: "Term 3B",
  location: "Waterloo, ON, Canada",
  email: "m7zhu@uwaterloo.ca",
  github: "https://github.com/RossmaryWine",
  linkedin: "https://www.linkedin.com/in/michael-zhu-3682a1250/",
  resumeHref: "/resume/michael-zhu-resume.pdf",
  intro:
    "I'm an Electrical and Computer Engineering student at the University of Waterloo, and I keep finding myself drawn back to the layer where hardware and software meet. Firmware, real-time systems, and getting a piece of hardware to do exactly what I tell it to, that's the stuff I enjoy digging into, and I'm always excited to keep learning more of it.",
  heroSkills: [
    "C",
    "C++",
    "ARM Cortex-M4",
    "ARM Assembly",
    "RTOS & Real-Time Scheduling",
    "FPGA (NIOS II)",
    "Python",
  ],
  // TODO: Add a phone number here only if you want it public; omitted intentionally for now.
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
  { label: "Résumé", href: site.resumeHref, external: true },
  { label: "Contact", href: "/contact" },
];
