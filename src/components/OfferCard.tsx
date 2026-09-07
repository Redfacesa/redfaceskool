"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import type { Instructor, LearningOffer } from "@/lib/domain";
import { formatZar } from "@/lib/domain";
import { CoverMedia } from "./CoverMedia";

const SAVE_KEY = "refesco_saved";

export function hrefFor(offer: LearningOffer) {
  return offer.kind === "course" ? `/courses/${offer.slug}` : `/events/${offer.slug}`;
}

export function OfferCard({
  offer,
  instructor,
}: {
  offer: LearningOffer;
  instructor?: Instructor;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const ids = readSaved();
    setSaved(ids.includes(offer.id));
  }, [offer.id]);

  function toggle(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const next = readSaved().includes(offer.id)
      ? readSaved().filter((id) => id !== offer.id)
      : [...readSaved(), offer.id];
    localStorage.setItem(SAVE_KEY, JSON.stringify(next));
    setSaved(next.includes(offer.id));
  }

  return (
    <article className="card">
      <div style={{ position: "relative" }}>
        <button className="save" type="button" onClick={toggle} aria-label={saved ? "Remove save" : "Save"}>
          {saved ? "★" : "☆"}
        </button>
        <Link href={hrefFor(offer)}>
          <CoverMedia src={offer.cover} slug={offer.slug} title={offer.title} kicker={offer.kind} />
        </Link>
      </div>
      <div className="card-body">
        <p className="kicker">
          {offer.kind === "course" ? "Course" : offer.kind === "live" ? "Live" : "Event"}
          {instructor ? ` · ${instructor.name}` : ""}
        </p>
        <Link href={hrefFor(offer)}>
          <h3>{offer.title}</h3>
        </Link>
        <p className="muted">{offer.summary}</p>
        <p className="price">{offer.priceZar === 0 ? "Free" : formatZar(offer.priceZar)}</p>
      </div>
    </article>
  );
}

export function readSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}
