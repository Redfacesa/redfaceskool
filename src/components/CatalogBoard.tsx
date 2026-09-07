"use client";

import { useEffect, useMemo, useState } from "react";
import type { Instructor, LearningOffer, OfferKind } from "@/lib/domain";
import { OfferCard, readSaved } from "./OfferCard";

type Filter = "all" | OfferKind | "saved";

export function CatalogBoard({
  offers,
  instructors,
  initialQuery = "",
  kinds,
}: {
  offers: LearningOffer[];
  instructors: Instructor[];
  initialQuery?: string;
  kinds?: OfferKind[];
}) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<Filter>("all");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(readSaved());
  }, [filter]);

  const people = useMemo(() => new Map(instructors.map((p) => [p.slug, p])), [instructors]);

  const rows = offers.filter((offer) => {
    if (kinds && !kinds.includes(offer.kind)) return false;
    if (filter !== "all" && filter !== "saved" && offer.kind !== filter) return false;
    if (filter === "saved" && !savedIds.includes(offer.id)) return false;
    const hay = `${offer.title} ${offer.summary} ${offer.tags.join(" ")}`.toLowerCase();
    return hay.includes(query.trim().toLowerCase());
  });

  const tabs: Array<{ id: Filter; label: string }> = [
    { id: "all", label: "All" },
    ...(kinds || (["course", "live", "event"] as OfferKind[])).map((kind) => ({
      id: kind,
      label: kind === "course" ? "Courses" : kind === "live" ? "Live" : "Events",
    })),
    { id: "saved", label: "Saved" },
  ];

  return (
    <div>
      <div className="search" style={{ marginBottom: 14, maxWidth: 520 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Python, events, an instructor topic"
          aria-label="Filter catalog"
        />
      </div>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab ${filter === tab.id ? "on" : ""}`}
            onClick={() => setFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {rows.length === 0 ? (
        <p className="muted">Nothing in this view. Try another filter or save a course from the catalog.</p>
      ) : (
        <div className="grid">
          {rows.map((offer) => (
            <OfferCard key={offer.id} offer={offer} instructor={people.get(offer.instructorSlug)} />
          ))}
        </div>
      )}
    </div>
  );
}
