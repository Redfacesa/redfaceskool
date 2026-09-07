import { CatalogBoard } from "@/components/CatalogBoard";
import { allInstructors, offers } from "@/lib/catalog";

export default async function EventsPage() {
  const people = await allInstructors();
  const live = offers.filter((o) => o.kind === "live" || o.kind === "event");
  return (
    <main>
      <div className="page-head">
        <p className="kicker">Live</p>
        <h1>Rooms with a date</h1>
        <p className="muted">Workshops you book. Community you can attend without buying a course.</p>
      </div>
      <CatalogBoard offers={live} instructors={people} kinds={["live", "event"]} />
    </main>
  );
}
