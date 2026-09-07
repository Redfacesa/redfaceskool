"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Instructor, LearningOffer } from "@/lib/domain";
import { formatZar } from "@/lib/domain";
import PayButton from "./PayButton";
import { CoverMedia } from "./CoverMedia";

export function StudioLayout({
  offer,
  instructor,
  kindLabel,
  actionLabel,
  extra,
}: {
  offer: LearningOffer;
  instructor: Instructor | null;
  kindLabel: string;
  actionLabel: string;
  extra?: React.ReactNode;
}) {
  const [open, setOpen] = useState(0);
  const lessons = offer.lessons || [];
  const active = lessons[open];

  const when = useMemo(() => {
    if (!offer.startsAt) return null;
    return new Date(offer.startsAt).toLocaleString("en-ZA", { dateStyle: "full", timeStyle: "short" });
  }, [offer.startsAt]);

  return (
    <div className="split">
      <div className="stack" style={{ gap: 16 }}>
        <CoverMedia className="tall" src={offer.cover} slug={offer.slug} title={offer.title} kicker={kindLabel} />
        <p className="kicker">{kindLabel}</p>
        <h1 style={{ fontSize: 34 }}>{offer.title}</h1>
        <p className="muted">{offer.summary}</p>
        {instructor ? (
          <p>
            <Link href={`/instructors/${instructor.slug}`}>{instructor.name}</Link>
            {" · "}
            {instructor.title} · {instructor.city}
          </p>
        ) : null}
        {when ? <p>{when}</p> : null}
        {extra}

        {lessons.length > 0 ? (
          <section className="stack">
            <h2>Curriculum</h2>
            <p className="muted">Open a lesson. Preview is free. The rest unlocks after payment confirms.</p>
            {active ? (
              <article className="panel">
                <div className="panel-body stack">
                  <p className="kicker">{active.preview ? "Preview" : "Locked until enrolled"}</p>
                  <h3>{active.title}</h3>
                  <p className="muted">
                    {active.preview
                      ? "Watch this intro in the marketplace. The remaining lessons open on your Library after RedFace Pay confirms."
                      : "This lesson is in the paid program. Enroll on the right to unlock it on your identity."}
                  </p>
                </div>
              </article>
            ) : null}
            {lessons.map((lesson, index) => (
              <button
                key={lesson.title}
                type="button"
                className={`lesson ${open === index ? "on" : ""}`}
                onClick={() => setOpen(index)}
              >
                <span>
                  {index + 1}. {lesson.title}
                  {lesson.preview ? <span className="pill" style={{ marginLeft: 8 }}>Preview</span> : null}
                </span>
                <span className="muted">{lesson.minutes} min</span>
              </button>
            ))}
          </section>
        ) : null}
      </div>

      <aside className="card sticky-card">
        <div className="card-body stack">
          <p className="kicker">Get in</p>
          <p className="price" style={{ fontSize: 28 }}>
            {offer.priceZar === 0 ? "Free" : formatZar(offer.priceZar)}
          </p>
          {offer.hours ? <p className="muted">{offer.modules} modules · {offer.hours} hours</p> : null}
          {offer.seats ? <p className="muted">{offer.seats} seats</p> : null}
          {offer.certificate === "refresco_completion" ? (
            <p className="pill">RedFace Skool certificate of completion</p>
          ) : (
            <p className="pill">Industry certification pathway</p>
          )}
          <PayButton offerId={offer.id} label={actionLabel} />
        </div>
      </aside>
    </div>
  );
}
