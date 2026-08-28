import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { PageBackdrop } from "@/components/PageBackdrop";

export const metadata: Metadata = {
  title: "About",
  description: "Short technical bio: firmware, embedded systems, and real time software.",
};

export default function AboutPage() {
  return (
    <PageBackdrop>
      <div className="py-16 sm:py-24">
        <div className="container-content max-w-3xl">
          <p className="eyebrow">About</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{site.name}</h1>

          <div className="mt-8 flex flex-col gap-5 text-[16px] leading-relaxed text-ink-soft">
            <p>
              I&apos;m an Electrical and Computer Engineering student at {site.school}
              {site.term ? ` (${site.term})` : ""}, most interested in the layer where hardware and
              software meet: firmware, embedded systems, low level software, real time systems, and
              hardware/software integration.
            </p>
            <p>
              Most recently, that&apos;s meant building a real time executive from scratch for the
              STM32 ARM Cortex-M4, with an SVC based syscall layer, PendSV context switching, an
              Earliest Deadline First scheduler, and a first fit memory allocator that never calls
              malloc(). I&apos;ve also worked at the hardware/software boundary on an Altera FPGA
              (NIOS II, interrupt driven I/O) and designed interface hardware in coursework. See{" "}
              <Link href="/projects/rtos-kernel" className="text-signal hover:text-signal-soft">
                the RTOS kernel
              </Link>{" "}
              and{" "}
              <Link href="/projects" className="text-signal hover:text-signal-soft">
                the reservoir system adapter board
              </Link>{" "}
              for specifics.
            </p>
            <p>
              Outside of embedded work, I&apos;ve built data engineering pipelines and automation
              tooling professionally (Statistics Canada, ECCC) and firmware adjacent testing/CI
              infrastructure at Ford. See{" "}
              <Link href="/experience" className="text-signal hover:text-signal-soft">
                Experience
              </Link>{" "}
              for details.
            </p>
          </div>

          <div className="mt-12 rounded-md border border-line bg-base-panel p-6 sm:p-8">
            <h2 className="font-mono text-[12px] uppercase tracking-wide text-ink-muted">
              Education
            </h2>
            <p className="mt-3 text-lg font-semibold text-ink">{site.school}</p>
            <p className="mt-1 text-[15px] text-ink-soft">
              {site.program}, {site.term}
            </p>
            {/* TODO: Add relevant coursework or expected graduation date if you'd like them listed here. */}
          </div>
        </div>
      </div>
    </PageBackdrop>
  );
}
