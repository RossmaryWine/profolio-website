import { Project } from "@/types";

export const projects: Project[] = [
  // ---------------------------------------------------------------------
  // FEATURED — flagship project, full detail page
  // ---------------------------------------------------------------------
  {
    slug: "rtos-kernel",
    name: "Real-Time Executive (RTOS Kernel)",
    oneLiner:
      "A from-scratch real-time kernel for STM32 (ARM Cortex-M4): SVC-based syscalls, PendSV context switching, and a malloc-free memory allocator.",
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
      src: "/images/projects/rtos-memory-map.svg",
      alt: "Diagram of the RTOS kernel's memory allocator and context-switch flow",
      caption:
        "Simplified view of the free-list allocator and PendSV context-switch path.",
    },
    github: undefined, // TODO: Add GitHub repo URL for the RTOS kernel project
    detail: {
      overview:
        "A real-time executive (RTOS kernel) written in C for the STM32 ARM Cortex-M4, covering the three subsystems a kernel needs to run concurrent, deadline-aware tasks on bare metal: a task/scheduler layer, an SVC-based syscall interface, and a dynamic memory allocator that never calls malloc().",
      problem:
        "Bare-metal firmware that needs to run several concurrent tasks with timing guarantees can't rely on a general-purpose OS or an off-the-shelf heap allocator, since both introduce overhead and non-determinism that a real-time system can't afford. The kernel had to provide task isolation, preemptive scheduling against deadlines, and safe dynamic memory allocation, all built directly on Cortex-M4 exception handling.",
      architecture: [
        "Kernel entry points (osKernelInit, osCreateTask, osKernelStart, osYield, osSleep, osTaskInfo, osGetTID, osTaskExit, osSetDeadline) are exposed to user tasks as SVC calls. Each wrapper loads arguments into registers and issues `svc`, so kernel state is only ever mutated from a single, consistently-prioritized exception context.",
        "A central SVC_Handler_Main dispatcher decodes the SVC immediate from the faulting instruction and routes to the matching handler, falling through to the memory-allocator's own SVC dispatch table for allocation-related calls.",
        "Each task is tracked in a fixed-size array of Task Control Blocks (TCBs) holding its entry point, saved stack pointer, state (READY / RUNNING / SLEEPING / DORMANT), and deadline/timeslice fields.",
        "Task stacks are not statically reserved: each task's stack is obtained from the kernel's own dynamic allocator at creation time and released back to the free list on task exit.",
      ],
      implementation: [
        "Context switching is driven by the PendSV exception. The outgoing task's R4–R11 are pushed onto its own stack (STMDB), control passes to a C routine (osPendSVSwitch) that runs the scheduler and returns the incoming task's saved stack pointer, and R4–R11 are then popped for the incoming task before an exception return with an EXC_RETURN value forced back to Thread mode / PSP.",
        "Scheduling policy is Earliest Deadline First: a SysTick handler running every 1 ms decrements the remaining timeslice (relative deadline) of every READY/RUNNING task and the sleep counter of every SLEEPING task, waking tasks and requesting a context switch through PendSV when a shorter deadline becomes ready.",
        "SVCall, SysTick, and PendSV are deliberately given adjacent, low interrupt priorities. SysTick and PendSV specifically share the lowest priority, so a timer tick can never preempt a partially-restored PendSV context switch.",
        "A dedicated idle path (the null task) simply yields in a loop, so the scheduler always has a valid task to dispatch even when no user task is READY.",
        "The very first transition from main() into the task scheduler has no 'outgoing' task to save, so a small dedicated bootstrap stack gives PendSV a valid initial PSP for that one-time transition.",
        "Memory is served from a single heap region (sized from the linker-provided image end to the top of stack) by a first-fit allocator over a doubly linked free list kept sorted by address, using 4-byte alignment and a minimum block size to avoid unusable slivers.",
        "Deallocation validates the freed pointer against heap bounds, alignment, and the recorded owning task ID before returning a block to the free list, then coalesces it with an adjacent free neighbor on either side to limit fragmentation.",
      ],
      challenges: [
        "Keeping a context switch atomic with respect to the timer tick: SysTick and PendSV share the lowest interrupt priority specifically so a tick can't interrupt PendSV mid-restore and corrupt the incoming task's register state.",
        "Bootstrapping the first-ever context switch, which has no valid outgoing task stack to save from, using a small dedicated bootstrap stack and a first-switch flag checked inside the PendSV C handler.",
        "Guarding against re-entrant context-switch requests: a context_switch_running flag prevents multiple SVC calls (e.g. a task creation that also triggers a switch) from pending PendSV more than once.",
        "Reclaiming a task's dynamically allocated stack safely on exit: release has to run through the same ownership-checked, coalescing deallocation path as any other free, so a dead task's memory doesn't fragment or corrupt the free list.",
        "Validating every pointer passed to the deallocator (bounds, 4-byte alignment, and task ownership) since a bad free from user-task code should fail safely rather than corrupt kernel memory.",
      ],
      keyComponents: [
        {
          name: "SVC syscall layer",
          description:
            "Inline-assembly wrappers (osCreateTask, osYield, osSleep, osSetDeadline, …) that marshal arguments into registers and trap into the kernel via `svc`, decoded by a single SVC_Handler_Main dispatcher.",
        },
        {
          name: "PendSV context switch",
          description:
            "Hand-written ARM assembly (os_cpu.s) that saves/restores R4–R11 around a C scheduler call and performs the exception return back to Thread mode on the process stack.",
        },
        {
          name: "EDF scheduler",
          description:
            "SysTick-driven Earliest Deadline First policy operating over TCB timeslice/deadline fields, with periodic-task support via osPeriodYield.",
        },
        {
          name: "First-fit memory allocator",
          description:
            "Address-sorted doubly linked free list with 4-byte alignment, block splitting, coalescing, per-task ownership tracking, and external-fragmentation counting (k_mem_count_extfrag), no malloc().",
        },
      ],
      results: [
        "Successfully implemented dynamic task creation and termination, SVC-based kernel operations, and PendSV-driven concurrent task execution on STM32 Cortex-M4 hardware.",
        "Delivered a working preemptive EDF scheduler supporting dynamically allocated task stacks, deadline-based priorities, task periodicity, and runtime deadline updates.",
        "Implemented block splitting, coalescing, and external-fragmentation tracking in the allocator with zero reliance on the C standard library heap.",
        // TODO: Add quantified results if available — e.g. measured context-switch latency, scheduling jitter, worst-case interrupt latency, or heap fragmentation under a benchmark workload.
      ],
      technologies: [
        "C",
        "ARM Cortex-M4 (STM32)",
        "ARM assembly (Thumb-2)",
        "SVC / PendSV / SysTick exceptions",
        "CMSIS",
      ],
      // TODO: Add a short reflection on what you learned building this project (e.g. hardest bug, biggest design trade-off).
    },
  },

  // ---------------------------------------------------------------------
  // FEATURED — no dedicated detail page
  // ---------------------------------------------------------------------
  {
    slug: "interrupt-driven-fpga-system",
    name: "Interrupt-Driven FPGA Stimulus-Response System",
    oneLiner:
      "A real-time polling and interrupt system on an Altera FPGA (NIOS II / Avalon bus), benchmarked head-to-head against a polling design.",
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
    github: undefined, // TODO: Add GitHub/repo link
    detail: undefined,
  },
  {
    slug: "ece298-reservoir-adapter",
    name: "ECE 298 Reservoir System Adapter",
    oneLiner:
      "An STM32 interface PCB coordinating motor drivers, an ultrasonic sensor, an RPM sensor, a servo, and an RGB indicator for a reservoir-system testbed.",
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
      src: "/images/projects/ece298-reservoir-adapter-schematic.png",
      alt: "Proteus schematic of the ECE 298 Reservoir System Adapter board, showing motor drivers, sensor headers, and buffer ICs",
      caption: "Schematic capture of the adapter board (Proteus).",
    },
    github: undefined, // TODO: Add GitHub/repo link
    detail: undefined,
  },
  {
    slug: "graph-route-optimization",
    name: "Graph-Based Route Optimization Program",
    oneLiner:
      "An interactive C++ traffic-network application resolving shortest paths over a dynamically updating weighted graph.",
    period: "May 2024 – Jun 2024",
    featured: true,
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
      "A real-time focus-monitoring prototype analyzing camera-derived physiological and behavioral signals.",
    period: "Jan 2026 – Jan 2026",
    featured: false,
    tags: ["Hackathon", "Real-Time Data Pipeline", "Python"],
    problem:
      "Turning live camera-derived physiological and behavioral signals into real-time focus alerts within a hackathon timeframe.",
    contribution: undefined,
    technologies: ["Python", "UDP networking", "JSON", "Solace Agent Mesh"],
    accomplishments: [
      "Built a real-time focus-monitoring prototype using Solace Agent Mesh to analyze camera-derived physiological and behavioral data and trigger focus alerts.",
      "Developed a Python UDP pipeline to parse and normalize live sensor data (heart rate, breathing, blink, and speech events) into JSON for agent processing.",
    ],
    github: undefined, // TODO: Add GitHub/repo link
  },
  {
    slug: "quant-trading-algorithm",
    name: "Quantitative Trading Algorithm",
    oneLiner:
      "A backtested ETF strategy combining trend-following and mean-reversion signals with volatility-weighted allocation.",
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
