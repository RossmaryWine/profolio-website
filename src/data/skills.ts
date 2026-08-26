import { SkillGroupData } from "@/types";

export const skillGroups: SkillGroupData[] = [
  {
    category: "Languages",
    skills: ["C", "C++", "ARM Assembly", "Python", "VHDL", "Bash", "SQL", "MATLAB"],
  },
  {
    category: "Embedded / Firmware",
    skills: [
      "STM32 (ARM Cortex-M4)",
      "SVC / PendSV context switching",
      "SysTick-driven scheduling",
      "Preemptive EDF scheduling",
      "Interrupt-driven I/O",
      "CMSIS",
      "Embedded unit testing (Unity, CMock)",
    ],
  },
  {
    category: "Hardware / Architecture",
    skills: [
      "ARM Cortex-M4 architecture",
      "Altera FPGA (NIOS II, Avalon bus)",
      "PCB / schematic capture (Proteus)",
      "Memory-mapped I/O",
    ],
  },
  {
    category: "Systems Programming",
    skills: [
      "Dynamic memory allocation & free-list management",
      "Concurrency",
      "pthreads",
      "Task scheduling",
      "STL",
    ],
  },
  {
    category: "Development & Debugging",
    skills: ["Git", "Linux", "VS Code", "Jira", "Systematic debugging", "GitLab issue tracking"],
  },
  {
    category: "Testing / Automation",
    skills: [
      "Unity",
      "CMock",
      "Polyspace static analysis",
      "Jenkins CI/CD",
      "R package CI/CD pipelines",
    ],
  },
  {
    category: "Tools & Platforms",
    skills: ["DuckDB", "Artifactory", "Nios II toolchain", "Jenkins"],
  },
];

// Real skills from the résumé that lean more data/software than embedded,
// kept visible for completeness, but deliberately not emphasized alongside
// the firmware/embedded categories above.
export const additionalLibraries: SkillGroupData = {
  category: "Also Worked With: Data & Software Libraries",
  skills: ["Pandas", "NumPy", "Plotly", "OpenCV", "TensorFlow", "Keras", "yfinance"],
};
