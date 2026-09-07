import Link from "next/link";
import { allInstructors, offers } from "@/lib/catalog";
import { formatZar } from "@/lib/domain";

export default async function EventsPage() {
  const people = await allInstructors();
  const live = offers.filter((o) => o.kind === "live" || o.kind === "event");
  return (
    <main>
      <h1>Live learning and events</h1>
      <p className="muted">Workshops you book. Community you can attend without buying a course.</p>
      <div className="grid" style={{ marginTop: 24 }}>
        {live.map((offer) => {
          const instructor = people.find((p) => p.slug === offer.instructorSlug);
          return (
            <Link key={offer.id} href={`/events/${offer.slug}`} className="card">
              <p className="kicker">{offer.kind === "live" ? "Live workshop" : "Community event"}</p>
              <h3>{offer.title}</h3>
              <p className="muted">{offer.summary}</p>
              <p className="muted">{instructor?.name}</p>
              <p className="price">{offer.priceZar === 0 ? "Free" : formatZar(offer.priceZar)}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
