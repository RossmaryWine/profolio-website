import { Project } from "@/types";

export const projects: Project[] = [
  // ---------------------------------------------------------------------
  // FEATURED — flagship project, full detail page
  // ---------------------------------------------------------------------
  {
    slug: "rtos-kernel",
    name: "Real Time Executive (RTOS Kernel)",
    oneLiner:
      "A real time kernel built from scratch for the STM32 ARM Cortex-M4: SVC syscalls, PendSV context switching, and a memory allocator that never calls malloc().",
    period: "May 2026 to Aug 2026",
    featured: true,
    tags: ["Embedded", "RTOS", "ARM Cortex-M4", "C"],
    problem:
      "Real time embedded applications need deterministic task scheduling and memory management, without the overhead, nondeterminism, or heap fragmentation risk of pulling in a general purpose OS or standard malloc().",
    technologies: [
      "C",
      "ARM Cortex-M4 (STM32)",
      "ARM assembly",
      "SVC / PendSV",
      "SysTick",
      "CMSIS",
    ],
    accomplishments: [
      "Developed a real time executive in C for an STM32 ARM Cortex-M4, implementing dynamic task creation and termination, SVC based kernel operations, and PendSV context switching for concurrent task execution.",
      "Built a custom first fit dynamic memory allocator with free list management, 4 byte alignment, per task memory ownership, block coalescing, and external fragmentation tracking, without using malloc().",
      "Implemented a SysTick driven preemptive Earliest Deadline First (EDF) scheduler with dynamically allocated task stacks, deadline based priorities, task periodicity, and runtime deadline updates.",
    ],
    image: {
      src: "/images/projects/rtos-nucleo-board.png",
      alt: "STM32 Nucleo development board running the RTOS kernel firmware",
      caption: "The kernel running on the STM32 Nucleo board.",
    },
    github: undefined, // TODO: Add GitHub repo URL for the RTOS kernel project
    detail: {
      description: [
        "A real time kernel written in C for the STM32 ARM Cortex-M4, running concurrent, deadline aware tasks on bare metal.",
        "Needed deterministic scheduling and memory management without a general purpose OS or the overhead of standard malloc().",
        "Three subsystems: an SVC based syscall layer, PendSV context switching, and a memory allocator with no malloc().",
      ],
      howIBuiltIt: [
        "Exposed kernel entry points (osCreateTask, osYield, osSleep, ...) to tasks as SVC calls, decoded by a single SVC_Handler_Main dispatcher.",
        "Wrote the PendSV context switch in ARM assembly: save/restore R4 to R11 around a C scheduler call, then return to Thread mode on the process stack.",
        "Built a SysTick driven preemptive EDF scheduler that requests a context switch through PendSV whenever a shorter deadline becomes ready.",
        "Gave SVCall, SysTick, and PendSV adjacent low priorities, with SysTick and PendSV sharing the lowest, so a timer tick can never preempt a partially restored context switch.",
        "Wrote a first fit allocator over an address sorted free list: 4 byte alignment, block splitting, coalescing, and per task ownership tracking, no malloc().",
        "Validated every freed pointer's bounds, alignment, and owning task before returning it to the free list.",
      ],
      results: [
        "Delivered dynamic task creation/termination, SVC based kernel operations, and PendSV driven concurrent task execution on real Cortex-M4 hardware.",
        "Working preemptive EDF scheduler with dynamically allocated task stacks, deadline priorities, task periodicity, and runtime deadline updates.",
        "Allocator supports block splitting, coalescing, and external fragmentation tracking, with zero reliance on the C standard library heap.",
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
    slug: "fpga-audio-player",
    name: "NIOS II WAV Audio Player",
    oneLiner:
      "A fully functional WAV audio player on a NIOS II soft core: SD card playback through FatFs, pushbutton transport controls, and a live LCD track readout.",
    period: "Sept 2025 to Oct 2025",
    featured: true,
    tags: ["FPGA", "Audio", "Embedded", "Interrupts"],
    problem:
      "Streaming WAV audio from an SD card into a hardware codec in real time on a soft core CPU, with debounced pushbutton transport control and switch selected playback speed, and no RTOS underneath any of it.",
    technologies: [
      "NIOS II (soft core CPU)",
      "Altera/Intel MAX 10 FPGA",
      "Avalon audio core",
      "FatFs (SD card, SPI)",
      "GPIO interrupts (debounce)",
      "Character LCD (HAL device)",
    ],
    accomplishments: [
      "Built a WAV audio player on a NIOS II soft core: FatFs reads .WAV files off an SD card and streams them into the Avalon audio core's FIFOs in real time.",
      "Added pushbutton transport control (play/pause, next, previous, rewind) off a timer interrupt debounce layer, plus switch selected playback modes: normal, half speed, double speed, and mono.",
      "Drove a live LCD readout of the current track name and playback state through the NIOS II HAL's character device driver.",
    ],
    image: {
      src: "/images/projects/de2-fpga-board.jpeg",
      alt: "Altera FPGA development board with audio, SD card, and LCD peripherals",
      caption: "An Altera/NIOS II FPGA platform: the same class of hardware the audio player runs on.",
    },
    github: undefined, // TODO: Add GitHub/repo link
    detail: {
      description: [
        "A WAV audio player running on a NIOS II soft core in a MAX 10 FPGA: browses an SD card for .WAV files and plays them through the board's Avalon audio codec.",
        "Needed to keep a hardware audio FIFO fed from a comparatively slow SD card in real time, while also reading debounced pushbuttons for transport control, with no RTOS underneath.",
        "Built in stages: an audio codec loopback test, a FatFs file monitor with a manual play command, a timer interrupt button debouncer, then the full player combining all three.",
      ],
      howIBuiltIt: [
        "Started with a polling loopback test that reads a sample from the audio codec's input FIFO and immediately writes it back out, to confirm the Avalon audio core and NIOS II wiring before touching storage.",
        "Layered FatFs over an SD/SPI disk driver to scan the card's root directory for .WAV files and open them by name, then streamed fixed size chunks into the codec's left/right FIFOs, busy waiting on FIFO space between writes.",
        "Wrote a periodic timer interrupt that samples all 4 pushbuttons and debounces each with an up/down counter against a threshold, exposing the result as a state array the main loop polls for press/release edges.",
        "Combined all of it into one playback loop: transport buttons drive file selection and play/pause/rewind state, board switches pick normal, half speed, or double speed stereo, or mono, by changing how many bytes are skipped per audio frame, and an LCD character device shows the current track and state.",
      ],
      results: [
        "Working end to end player: scans an SD card for WAV files and plays them through the audio codec, responding to all 4 transport buttons.",
        "Switch selected playback modes (half speed, double speed, mono) work by changing the FIFO write pattern alone, with no separate code path per mode.",
        "Debounce and playback run concurrently without missing samples or button presses: a timer ISR samples buttons in the background while the main loop polls both button edges and audio FIFO space.",
      ],
      technologies: [
        "NIOS II (soft core CPU)",
        "Altera/Intel MAX 10 FPGA",
        "Avalon audio core",
        "FatFs (SD card, SPI)",
        "GPIO interrupts (debounce)",
        "Character LCD (HAL device)",
      ],
    },
  },
  {
    slug: "ece298-reservoir-adapter",
    name: "Reservoir System Adapter",
    oneLiner:
      "An STM32 controller for a reservoir irrigation system with four pipelines: pump/valve PWM, sensor feedback, and a serial configured schedule.",
    period: "Sept 2025 to Dec 2025",
    featured: true,
    tags: ["Hardware", "PCB Design", "Firmware", "Sensors & Actuators"],
    problem:
      "Coordinating pump speed, valve routing, and status indicators against live sensor feedback, on a serial configured hourly schedule, from bare metal STM32.",
    technologies: [
      "STM32 (HAL)",
      "PCB / schematic capture (Proteus)",
      "Timer PWM & input capture",
      "HC-SR04 ultrasonic sensor",
      "RPM/flow sensor (GPIO interrupt)",
      "Servo & DC motor driver control",
      "UART serial CLI",
      "CMOS/TTL buffer & level shifting ICs",
    ],
    accomplishments: [
      "Built an STM32 firmware controller that runs a scheduled irrigation cycle across four pipelines: PWM driven pump speed and direction and servo valve routing from a serial configured 24 hour schedule per pipeline.",
      "Implemented sensor and actuator drivers over STM32 HAL: ultrasonic water level sensing via timer input capture, interrupt and polling RPM (flow) measurement, a multiplexed seven segment display, and an RGB status indicator.",
      "Added a UART serial CLI for setup configuration and live telemetry, plus automatic pump shutoff and a manual potentiometer override for reservoir empty and no scheduled speed cases.",
    ],
    image: {
      src: "/images/projects/stm32-clock-configuration.png",
      alt: "STM32CubeMX clock configuration view for the adapter board's microcontroller",
      caption: "STM32CubeMX clock configuration for the board's MCU.",
    },
    github: undefined, // TODO: Add GitHub/repo link
    detail: {
      description: [
        "A firmware controller for a reservoir irrigation testbed, coordinating a pump, a routing valve, and status indicators across four scheduled pipelines on an STM32 running bare metal.",
        "Needed to run an hours long irrigation schedule using live sensor feedback (water level, flow) instead of fixed open loop timing, configurable from a serial terminal.",
        "Structured as a state machine with four stages (setup, run, empty reservoir alarm, complete) on top of STM32 HAL drivers for each sensor and actuator.",
      ],
      howIBuiltIt: [
        "Built a serial CLI over UART for setup: each of 4 pipelines gets a pump speed preset and an active hour range, echoed back and confirmed with the onboard user button before the schedule starts.",
        "Drove the pump bidirectionally over two PWM timer channels and the routing valve over a third, mapped to a servo angle per pipeline.",
        "Measured water level with an HC-SR04 ultrasonic sensor via timer input capture (echo pulse edge timing), and flow rate from RPM sensor ticks read by interrupt and by polling.",
        "Advanced a software wall clock off a hardware timer interrupt to step through the 24 hour schedule, switching pump, valve, and LED state each hour and logging pipeline, PWM, RPM, and depth over serial at every rollover.",
      ],
      results: [
        "Working end to end loop: scheduled pump and valve switching across 4 pipelines, live water level and flow sensing, and a seven segment and RGB status readout.",
        "Reservoir empty and schedule complete states both cut the pump automatically, with a manual potentiometer override whenever a pipeline has no scheduled speed.",
        "Serial telemetry (pipeline, PWM, RPM, depth) logged at every hour rollover, for checking the schedule against actual sensor readings.",
      ],
      technologies: [
        "STM32 (HAL)",
        "PCB / schematic capture (Proteus)",
        "Timer PWM & input capture",
        "HC-SR04 ultrasonic sensor",
        "RPM/flow sensor (GPIO interrupt)",
        "Servo & DC motor driver control",
        "UART serial CLI",
        "CMOS/TTL buffer & level shifting ICs",
      ],
    },
  },
  {
    slug: "graph-route-optimization",
    name: "Graph Based Route Optimization Program",
    oneLiner:
      "A C++ traffic network app resolving shortest paths over a dynamically updating graph.",
    period: "May 2024 to Jun 2024",
    featured: false,
    tags: ["C++", "Algorithms", "Data Structures"],
    problem:
      "Supporting shortest path queries over a traffic network whose edge weights and topology change at runtime, without recomputing everything from scratch on every update.",
    technologies: ["C++", "Hash maps", "Priority queues", "Dijkstra's algorithm"],
    accomplishments: [
      "Built an interactive C++ traffic network application using nested hash maps and priority queues to support dynamic graph updates and path queries.",
      "Implemented Dijkstra's shortest path algorithm with dynamic edge weighting, reducing average query time compared with a naive search approach.",
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
      "A multi agent focus monitor on Solace Agent Mesh: webcam heart rate and phone camera vitals feed LLM agents that judge distraction and trigger a full screen alert.",
    period: "Jan 2026 to Jan 2026",
    featured: true,
    tags: ["Hackathon", "Multi Agent LLM", "Computer Vision", "Python"],
    problem:
      "Turning noisy, real time biometric signals (heart rate, breathing, blinking) into a single distraction verdict, then acting on it immediately, within a hackathon weekend.",
    technologies: [
      "Python",
      "Solace Agent Mesh",
      "OpenCV (Eulerian video magnification)",
      "Presage SmartSpectra SDK (rPPG)",
      "UDP networking",
      "Streamlit",
      "Tkinter",
    ],
    accomplishments: [
      "Built a multi agent focus detection pipeline on Solace Agent Mesh: dedicated Heartrate and BreathingRate LLM agents judge distraction from the last 10 sensor readings, coordinated by an orchestrator agent.",
      "Wired two live data sources into the pipeline: a webcam heart rate monitor (OpenCV Eulerian video magnification) posting to a streaming API, and a phone camera rPPG feed (Presage SmartSpectra: pulse, breathing, blink, talk events) over UDP.",
      "Built a fullscreen Tkinter \"focus lost\" overlay, spawned automatically on a distraction verdict, that locks out interaction behind a countdown before the user can acknowledge and dismiss it.",
    ],
    image: {
      src: "/images/projects/ottohack8-integration-diagram.jpeg",
      alt: "Diagram of the agent mesh routing signals between data sources and platform integrations",
      caption: "Solace Agent Mesh routing signals between sources and integrations.",
    },
    github: undefined, // TODO: Add GitHub/repo link
    detail: {
      description: [
        "A hackathon prototype that judges whether someone is still focused from live biometric signals and forces a break when they're not, built around a Solace Agent Mesh multi agent pipeline.",
        "Needed to turn noisy real time signals (heart rate, breathing, blinking, talking) into one distraction verdict and act on it immediately, in a single hackathon weekend.",
        "Two data paths feed the same mesh: an OpenCV webcam script for heart rate, and a phone running Presage's SmartSpectra SDK for pulse, breathing, and face behavior events over UDP.",
      ],
      howIBuiltIt: [
        "Adapted an open source Eulerian video magnification webcam heart rate script to batch BPM readings and POST them as JSON-RPC messages to a Solace Agent Mesh orchestrator, reading the analysis back off an SSE subscription.",
        "Configured dedicated Heartrate and BreathingRate SAM agents: each is an LLM prompted to read the last 10 readings and answer with a leading YES/NO on distraction plus a short explanation.",
        "Normalized SmartSpectra's phone camera output (pulse and breathing rate, blink and talk events, per signal stability flags) in a small UDP listener, keyed per session so multiple streams don't collide.",
        "On a YES verdict, spawned a fullscreen Tkinter alert as a separate process, with scanline and glitch animation and a countdown locked acknowledgment button, so it has to be consciously dismissed rather than ignored like a toast notification.",
        "Built a Streamlit dashboard that polls a shared JSON file for the latest verdict and BPM stats and shows a live focused/distracted status.",
      ],
      results: [
        "Working end to end on the webcam path: heart rate in, an agent verdict out, a fullscreen alert fired automatically on distraction, live status on the Streamlit dashboard.",
        "Still rough at the edges, as expected for a hackathon build: the webcam path's YES/NO in chat convention and the tool based DISCARD verdict path grew separately and were never fully reconciled, and the SmartSpectra phone path needs a manual pipe into the mesh rather than posting directly like the webcam path does.",
        "Runs as 3 to 4 separate processes started by hand (SAM, the monitor script, Streamlit, optionally the artifact saver): a working demo, not yet a single packaged app.",
      ],
      technologies: [
        "Python",
        "Solace Agent Mesh",
        "OpenCV (Eulerian video magnification)",
        "Presage SmartSpectra SDK (rPPG)",
        "UDP networking",
        "Streamlit",
        "Tkinter",
      ],
    },
  },
  {
    slug: "quant-trading-algorithm",
    name: "Quantitative Trading Algorithm",
    oneLiner:
      "An ETF strategy backtested with trend following, mean reversion, and volatility weighted allocation.",
    period: "Jan 2026 to present",
    featured: false,
    tags: ["Python", "Quantitative Finance", "Data Pipeline"],
    problem:
      "Combining complementary trading signals (trend following and mean reversion) with volatility aware position sizing, then validating the approach against a benchmark on historical data.",
    technologies: ["Python", "NumPy", "Pandas", "yfinance", "Bloomberg data"],
    accomplishments: [
      "Developing and backtesting an ETF trading strategy combining trend following and mean reversion models with volatility weighted allocation; backtested performance shows up to 70% higher cumulative returns than SPY.",
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
