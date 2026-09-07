"use client";

import Link from "next/link";
import { CoverMedia } from "./CoverMedia";
import { OfferCard } from "./OfferCard";
import type { Instructor, LearningOffer } from "@/lib/domain";
import { demoStudent } from "@/lib/catalog";
import { SHARED } from "@/lib/media";

export function WorkspaceHome({
  offers,
  instructors,
}: {
  offers: LearningOffer[];
  instructors: Instructor[];
}) {
  const bySlug = new Map(instructors.map((p) => [p.slug, p]));
  const upcoming = offers.filter((o) => o.kind === "live" || o.kind === "event");
  const continueOffer = offers.find((o) => o.slug === "building-ai-agents") || offers[0];
  const hour = new Date().getHours();
  const hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <section className="hero-work">
        <article className="panel">
          <CoverMedia
            className="tall"
            src={SHARED.home}
            slug="home"
            title="Keep building"
            kicker="Today"
          />
          <div className="panel-body stack">
            <p className="kicker">{hello}</p>
            <h1 style={{ fontSize: 32 }}>{demoStudent.name}, pick up where you left off.</h1>
            <p className="muted">
              This is your workspace, not a brochure. Continue a course, book a live room, or open your public identity.
            </p>
            <div className="row">
              {continueOffer ? (
                <Link className="btn" href={`/courses/${continueOffer.slug}`}>
                  Continue {continueOffer.title}
                </Link>
              ) : null}
              <Link className="btn ghost" href="/events">
                This week live
              </Link>
            </div>
            <div className="stats">
              <div className="stat">
                <b>{offers.filter((o) => o.kind === "course").length}</b>
                <span>Courses live</span>
              </div>
              <div className="stat">
                <b>{upcoming.length}</b>
                <span>Live and events</span>
              </div>
              <div className="stat">
                <b>{instructors.length}</b>
                <span>Instructors</span>
              </div>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-body stack">
            <p className="kicker">Continue</p>
            <h2>Learning path</h2>
            {demoStudent.paths.map((path) => (
              <div key={path.name} className="stack" style={{ gap: 6 }}>
                <p>{path.name} · {path.percent}%</p>
                <div className="bar" aria-hidden>
                  <span style={{ width: `${path.percent}%` }} />
                </div>
              </div>
            ))}
            <Link className="btn ghost" href="/u/manace">
              Open identity
            </Link>
          </div>
        </article>
      </section>

      <h2 style={{ margin: "0 0 14px" }}>Happening next</h2>
      <div className="grid" style={{ marginBottom: 28 }}>
        {upcoming.map((offer) => (
          <OfferCard key={offer.id} offer={offer} instructor={bySlug.get(offer.instructorSlug)} />
        ))}
      </div>

      <h2 style={{ margin: "0 0 14px" }}>Catalog</h2>
      <div className="grid">
        {offers.filter((o) => o.kind === "course").map((offer) => (
          <OfferCard key={offer.id} offer={offer} instructor={bySlug.get(offer.instructorSlug)} />
        ))}
      </div>
    </div>
  );
}
