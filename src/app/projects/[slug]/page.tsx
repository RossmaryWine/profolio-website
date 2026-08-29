import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import { PageBackdrop } from "@/components/PageBackdrop";

export function generateStaticParams() {
  return projects.filter((p) => p.detail).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.oneLiner,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project || !project.detail) {
    notFound();
  }

  const { detail } = project;

  return (
    <PageBackdrop>
      <article className="py-16 sm:py-24">
        <div className="container-content">
          <Link
            href="/projects"
            className="font-mono text-[13px] uppercase tracking-wide text-ink-muted hover:text-signal"
          >
            ← All projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{project.name}</h1>
          <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
            {project.oneLiner}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[13px] text-ink-muted">
            {project.period && <span>{project.period}</span>}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-signal hover:text-signal-soft">
                GitHub ↗
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-signal hover:text-signal-soft">
                Live demo ↗
              </a>
            )}
          </div>
        </div>

        {project.image && (
          <div className="container-content mt-6">
            <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-md border border-line bg-schematic-grid bg-grid bg-base-raised sm:aspect-[21/9]">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                className="object-contain p-6"
                sizes="100vw"
                priority
              />
            </div>
            {project.image.caption && (
              <p className="mt-2 font-mono text-[12px] text-ink-muted">{project.image.caption}</p>
            )}
          </div>
        )}

        <div className="container-content mt-16 grid gap-14 lg:grid-cols-[1fr_280px]">
          <div className="flex flex-col gap-14">
            <Section title="Summary">
              <BulletList items={detail.description} />
            </Section>

            <Section title="How I Built It">
              <BulletList items={detail.howIBuiltIt} />
            </Section>

            <Section title="Result">
              <BulletList items={detail.results} />
            </Section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-md border border-line bg-base-panel p-6">
              <h3 className="font-mono text-[12px] uppercase tracking-wide text-ink-muted">
                Technologies
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {detail.technologies.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </PageBackdrop>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-signal-dim" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
