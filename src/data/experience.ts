import { Experience } from "@/types";

export const experience: Experience[] = [
  {
    company: "Statistics Canada, EQ Innovations & Automation",
    title: "Junior Developer",
    location: "Ottawa, Canada",
    dateRange: "Jan 2026 – Apr 2026",
    description:
      "Built data-ingestion tooling and CI/CD infrastructure for processing government datasets.",
    accomplishments: [
      "Developed a generalized Python data-ingestion pipeline to convert fixed-width datasets with varying schemas and encodings into Parquet, integrating DuckDB and pandas for efficient downstream processing.",
      "Designed a custom fixed-width ingestion algorithm that parsed records using configurable widths and column specifications, handled byte- and character-based encodings, validated malformed records, and staged normalized data for Parquet export.",
      "Built a reusable R development repository template and CI/CD pipeline for VS Code, automating code formatting, validation/error checks, compatibility checks, package builds, and publishing to Artifactory.",
    ],
    technologies: ["Python", "DuckDB", "Pandas", "R", "CI/CD", "Artifactory", "VS Code"],
  },
  {
    company: "Ford",
    title: "Firmware Developer",
    location: "Kanata, Canada",
    dateRange: "Sept 2023 – Dec 2023",
    description:
      "Automated static-analysis workflows and improved embedded unit-test coverage for power-management firmware.",
    accomplishments: [
      "Automated Polyspace static-analysis workflows with Python integration for Jenkins and Excel, cutting daily build runtime through job chaining.",
      "Authored and refactored embedded C unit tests for FNV4 power-management firmware, improving code coverage from 24% to 91% through Unity, CMock, and Polyspace.",
    ],
    technologies: ["Embedded C", "Unity", "CMock", "Polyspace", "Jenkins", "Python"],
    emphasize: true,
  },
  {
    company: "Environment and Climate Change Canada (ECCC)",
    title: "Scientific Programmer",
    location: "Ottawa, Canada",
    dateRange: "Jan 2023 – May 2023",
    description:
      "Built scientific computing tools and improved model stability/debugging workflows.",
    accomplishments: [
      "Built Python tools using NumPy and RMN to calculate wind and pressure fields from satellite model outputs.",
      "Increased model stability and maintainability through systematic debugging and deployment of a GitLab issue-tracking system, shortening debugging cycles.",
    ],
    technologies: ["Python", "NumPy", "RMN", "GitLab"],
  },
];
