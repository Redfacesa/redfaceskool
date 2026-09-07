import Link from "next/link";
import { offers } from "@/lib/catalog";
import { formatZar } from "@/lib/domain";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <p className="kicker">Learning marketplace</p>
        <h1>Learn from people who ship, not from an empty classroom brand.</h1>
        <p>
          Refesco is where students, instructors, and technology events meet.
          Red Face does not have to be the teacher. We run the marketplace.
          Payments go through RedFace Pay.
        </p>
        <div className="row">
          <Link className="btn" href="/courses">Browse courses</Link>
          <Link className="btn ghost" href="/teach">Become an instructor</Link>
        </div>
      </section>

      <h2 style={{ margin: "48px 0 16px" }}>Three ways to learn</h2>
      <div className="grid">
        <article className="card">
          <p className="kicker">Courses</p>
          <h3>I want to learn Python</h3>
          <p className="muted">Self-paced programs with a Refesco certificate of completion.</p>
        </article>
        <article className="card">
          <p className="kicker">Live</p>
          <h3>I want to learn from this person</h3>
          <p className="muted">Workshops on a real calendar. Book, pay, attend.</p>
        </article>
        <article className="card">
          <p className="kicker">Community</p>
          <h3>I want to stay in the room</h3>
          <p className="muted">Talks, hackathons, and meetups even if you have not bought a course.</p>
        </article>
      </div>

      <h2 style={{ margin: "48px 0 16px" }}>On the catalog</h2>
      <div className="grid">
        {offers.slice(0, 3).map((offer) => (
          <Link key={offer.id} href={offer.kind === "event" || offer.kind === "live" ? `/events/${offer.slug}` : `/courses/${offer.slug}`} className="card">
            <p className="kicker">{offer.kind}</p>
            <h3>{offer.title}</h3>
            <p className="muted">{offer.summary}</p>
            <p className="price">{offer.priceZar === 0 ? "Free" : formatZar(offer.priceZar)}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
