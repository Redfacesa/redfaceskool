import Link from "next/link";
import { notFound } from "next/navigation";
import { instructorBySlug, offersForInstructor } from "@/lib/catalog";
import { VERIFICATION_LABEL, formatZar } from "@/lib/domain";

export default async function InstructorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = await instructorBySlug(slug);
  if (!person) notFound();
  const catalog = offersForInstructor(person.slug);

  return (
    <main className="stack" style={{ maxWidth: 720 }}>
      <p className="kicker">{person.city} · {person.title}</p>
      <h1>{person.name}</h1>
      <p>{person.headline}</p>
      <p className="pill ok">{VERIFICATION_LABEL[person.verification]}</p>
      <p className="muted">Instructor since {person.instructorSince}</p>
      <h2>Teaches</h2>
      <p>{person.teaches.join(" · ")}</p>
      <h2>Experience</h2>
      <ul>
        {person.experience.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <h2>On Refesco</h2>
      <div className="grid">
        {catalog.map((offer) => (
          <Link
            key={offer.id}
            href={offer.kind === "course" ? `/courses/${offer.slug}` : `/events/${offer.slug}`}
            className="card"
          >
            <p className="kicker">{offer.kind}</p>
            <h3>{offer.title}</h3>
            <p className="price">{offer.priceZar === 0 ? "Free" : formatZar(offer.priceZar)}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
