import { Project } from "@/types";

export const projects: Project[] = [
  // ---------------------------------------------------------------------
  // FEATURED — flagship project, full detail page
  // ---------------------------------------------------------------------
  {
    slug: "rtos-kernel",
    name: "Real-Time Executive (RTOS Kernel)",
    oneLiner:
      "A real-time kernel built from scratch for the STM32 ARM Cortex-M4: SVC syscalls, PendSV context switching, and a malloc-free allocator.",
    period: "May 2026 – Aug 2026",
    featured: true,
    tags: ["Embedded", "RTOS", "ARM Cortex-M4", "C"],
    problem:
      "Real-time embedded applications need deterministic task scheduling and memory management, without the overhead, non-determinism, or heap fragmentation risk of pulling in a general-purpose OS or standard malloc().",
    contribution:
      "Designed and implemented the kernel end-to-end: task/scheduler subsystem, SVC syscall layer, PendSV context-switch assembly, and the dynamic memory allocator.",
    technologies: [
      "C",
      "ARM Cortex-M4 (STM32)",
      "ARM assembly",
      "SVC / PendSV",
      "SysTick",
      "CMSIS",
    ],
    accomplishments: [
      "Developed a real-time executive in C for an STM32 ARM Cortex-M4, implementing dynamic task creation and termination, SVC-based kernel operations, and PendSV context switching for concurrent task execution.",
      "Built a custom first-fit dynamic memory allocator with free-list management, 4-byte alignment, per-task memory ownership, block coalescing, and external-fragmentation tracking, without using malloc().",
      "Implemented a SysTick-driven preemptive Earliest Deadline First (EDF) scheduler with dynamically allocated task stacks, deadline-based priorities, task periodicity, and runtime deadline updates.",
    ],
    image: {
      src: "/images/projects/rtos-nucleo-board.png",
      alt: "STM32 Nucleo development board running the RTOS kernel firmware",
      caption: "The kernel running on the STM32 Nucleo board.",
    },
    github: undefined, // TODO: Add GitHub repo URL for the RTOS kernel project
    detail: {
      description: [
        "A real-time kernel written in C for the STM32 ARM Cortex-M4, running concurrent, deadline-aware tasks on bare metal.",
        "Needed deterministic scheduling and memory management without a general-purpose OS or the overhead of standard malloc().",
        "Three subsystems: an SVC-based syscall layer, PendSV context switching, and a malloc-free memory allocator.",
      ],
      howIBuiltIt: [
        "Exposed kernel entry points (osCreateTask, osYield, osSleep, ...) to tasks as SVC calls, decoded by a single SVC_Handler_Main dispatcher.",
        "Wrote the PendSV context switch in ARM assembly: save/restore R4–R11 around a C scheduler call, then return to Thread mode on the process stack.",
        "Built a SysTick-driven preemptive EDF scheduler that requests a context switch through PendSV whenever a shorter deadline becomes ready.",
        "Gave SVCall, SysTick, and PendSV adjacent low priorities, with SysTick and PendSV sharing the lowest, so a timer tick can never preempt a partially restored context switch.",
        "Wrote a first-fit allocator over an address-sorted free list: 4-byte alignment, block splitting, coalescing, and per-task ownership tracking, no malloc().",
        "Validated every freed pointer's bounds, alignment, and owning task before returning it to the free list.",
      ],
      results: [
        "Delivered dynamic task creation/termination, SVC-based kernel operations, and PendSV-driven concurrent task execution on real Cortex-M4 hardware.",
        "Working preemptive EDF scheduler with dynamically allocated task stacks, deadline priorities, task periodicity, and runtime deadline updates.",
        "Allocator supports block splitting, coalescing, and external-fragmentation tracking, with zero reliance on the C standard library heap.",
      ],
      technologies: [
        "C",
        "ARM Cortex-M4 (STM32)",
        "ARM assembly (Thumb-2)",
        "SVC / PendSV / SysTick exceptions",
        "CMSIS",
      ],
    },
  },

  // ---------------------------------------------------------------------
  // FEATURED — no dedicated detail page
  // ---------------------------------------------------------------------
  {
    slug: "interrupt-driven-fpga-system",
    name: "Interrupt-Driven FPGA Stimulus-Response System",
    oneLiner:
      "An interrupt-driven vs. polling benchmark on an Altera FPGA (NIOS II / Avalon bus).",
    period: "Sept 2025 – Oct 2025",
    featured: true,
    tags: ["FPGA", "Interrupts", "Hardware/Software Integration"],
    problem:
      "Comparing two ways of handling time-critical stimulus/response events on a soft-core FPGA system, continuous polling versus interrupt-driven handling, to quantify the real-world CPU and latency cost of each approach.",
    contribution: undefined, // TODO: Clarify individual vs. team contribution for this project.
    technologies: ["NIOS II", "Altera FPGA", "Avalon Bus"],
    accomplishments: [
      "Built a real-time polling and interrupt system on an Altera FPGA using NIOS II and the Avalon bus.",
      "Benchmarked polling vs. interrupt designs, achieving a >40% CPU efficiency gain and sub-millisecond latency.",
    ],
    image: {
      src: "/images/projects/de2-fpga-board.jpeg",
      alt: "Altera DE2 development board with Cyclone II FPGA used for the stimulus-response system",
      caption: "The Altera DE2 board (Cyclone II FPGA) used for the benchmark.",
    },
    github: undefined, // TODO: Add GitHub/repo link
    detail: undefined,
  },
  {
    slug: "ece298-reservoir-adapter",
    name: "Reservoir System Adapter",
    oneLiner:
      "An STM32 interface PCB for a reservoir-system testbed: motor drivers, ultrasonic and RPM sensors, a servo, and an RGB indicator.",
    period: undefined, // TODO: Add project dates
    featured: true,
    tags: ["Hardware", "PCB Design", "Sensors & Actuators"],
    problem:
      // TODO: Clarify the assignment brief / system-level goal this board was built for.
      "Interfacing an STM32 microcontroller with a reservoir-system testbed's motors, sensors, and indicators through a dedicated adapter board.",
    contribution: undefined, // TODO: Clarify individual vs. team contribution for this project.
    technologies: [
      "PCB / schematic capture (Proteus)",
      "STM32",
      "Motor driver ICs",
      "Ultrasonic distance sensor (US-100)",
      "RPM sensor",
      "Servo control",
      "CMOS/TTL buffer & level-shifting ICs",
    ],
    accomplishments: [
      "Designed and captured a multi-peripheral interface schematic connecting an STM32 to dual motor drivers, an RGB LED, a servo, an ultrasonic distance sensor, and an RPM sensor.",
      "Buffered and level-shifted MCU I/O to the peripheral board using CMOS4050 and 74HCT541 logic, with a dedicated timer/display header for system status.",
    ],
    image: {
      src: "/images/projects/stm32-clock-configuration.png",
      alt: "STM32CubeMX clock configuration view for the adapter board's microcontroller",
      caption: "STM32CubeMX clock configuration for the board's MCU.",
    },
    github: undefined, // TODO: Add GitHub/repo link
    detail: undefined,
  },
  {
    slug: "graph-route-optimization",
    name: "Graph-Based Route Optimization Program",
    oneLiner:
      "A C++ traffic-network app resolving shortest paths over a dynamically updating graph.",
    period: "May 2024 – Jun 2024",
    featured: false,
    tags: ["C++", "Algorithms", "Data Structures"],
    problem:
      "Supporting shortest-path queries over a traffic network whose edge weights and topology change at runtime, without recomputing everything from scratch on every update.",
    contribution: undefined, // TODO: Clarify individual vs. team contribution for this project.
    technologies: ["C++", "Hash maps", "Priority queues", "Dijkstra's algorithm"],
    accomplishments: [
      "Built an interactive C++ traffic-network application using nested hash maps and priority queues to support dynamic graph updates and path queries.",
      "Implemented Dijkstra's shortest-path algorithm with dynamic edge weighting, reducing average query time compared with a naive search approach.",
    ],
    github: undefined, // TODO: Add GitHub/repo link
    detail: undefined,
  },

  // ---------------------------------------------------------------------
  // OTHER PROJECTS — compact cards
  // ---------------------------------------------------------------------
  {
    slug: "ottohack8-focus-monitor",
    name: "Ottohack8 Focus Monitor",
    oneLiner:
      "A real-time prototype monitoring focus from camera-derived physiological and behavioral signals.",
    period: "Jan 2026 – Jan 2026",
    featured: true,
    tags: ["Hackathon", "Real-Time Data Pipeline", "Python"],
    problem:
      "Turning live camera-derived physiological and behavioral signals into real-time focus alerts within a hackathon timeframe.",
    contribution: undefined,
    technologies: ["Python", "UDP networking", "JSON", "Solace Agent Mesh"],
    accomplishments: [
      "Built a real-time focus-monitoring prototype using Solace Agent Mesh to analyze camera-derived physiological and behavioral data and trigger focus alerts.",
      "Developed a Python UDP pipeline to parse and normalize live sensor data (heart rate, breathing, blink, and speech events) into JSON for agent processing.",
    ],
    image: {
      src: "/images/projects/ottohack8-integration-diagram.jpeg",
      alt: "Diagram of the agent mesh routing signals between data sources and platform integrations",
      caption: "Solace Agent Mesh routing signals between sources and integrations.",
    },
    github: undefined, // TODO: Add GitHub/repo link
  },
  {
    slug: "quant-trading-algorithm",
    name: "Quantitative Trading Algorithm",
    oneLiner:
      "An ETF strategy backtested with trend-following, mean-reversion, and volatility-weighted allocation.",
    period: "Jan 2026 – present",
    featured: false,
    tags: ["Python", "Quantitative Finance", "Data Pipeline"],
    problem:
      "Combining complementary trading signals (trend-following and mean-reversion) with volatility-aware position sizing, then validating the approach against a benchmark on historical data.",
    contribution: undefined,
    technologies: ["Python", "NumPy", "Pandas", "yfinance", "Bloomberg data"],
    accomplishments: [
      "Developing and backtesting an ETF trading strategy combining trend-following and mean-reversion models with volatility-weighted allocation; backtested performance shows up to 70% higher cumulative returns than SPY.",
      "Built a Python pipeline for data ingestion and feature engineering using NumPy and Pandas, with market data retrieved via yfinance and Bloomberg.",
    ],
    github: undefined, // TODO: Add GitHub/repo link
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
