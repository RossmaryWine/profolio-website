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
    "I'm an Electrical and Computer Engineering student at the University of Waterloo, interested in the layer where hardware and software meet: firmware, real-time systems, and hardware/software integration. Most recently I built a real-time kernel from scratch for the STM32 ARM Cortex-M4, with SVC based syscalls, PendSV context switching, and a memory allocator that never calls malloc().",
  skillsLine:
    "C · C++ · ARM Cortex-M4 · ARM Assembly · RTOS & real-time scheduling · FPGA (NIOS II) · Python",
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
