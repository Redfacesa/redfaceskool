import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverMedia } from "@/components/CoverMedia";
import { instructorBySlug, offersForInstructor } from "@/lib/catalog";
import { VERIFICATION_LABEL, formatZar } from "@/lib/domain";
import { avatarPath } from "@/lib/media";

export default async function InstructorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = await instructorBySlug(slug);
  if (!person) notFound();
  const catalog = offersForInstructor(person.slug);

  return (
    <main className="split">
      <div className="stack" style={{ gap: 16 }}>
        <CoverMedia
          className="portrait"
          src={avatarPath(person.slug)}
          slug={person.slug}
          title={person.name}
          kicker={person.city}
        />
        <p className="kicker">{person.city} · {person.title}</p>
        <h1 style={{ fontSize: 34 }}>{person.name}</h1>
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
      </div>
      <div className="stack">
        <h2>On RedFace Skool</h2>
        {catalog.map((offer) => (
          <Link
            key={offer.id}
            href={offer.kind === "course" ? `/courses/${offer.slug}` : `/events/${offer.slug}`}
            className="card"
          >
            <CoverMedia src={offer.cover} slug={offer.slug} title={offer.title} kicker={offer.kind} />
            <div className="card-body">
              <p className="kicker">{offer.kind}</p>
              <h3>{offer.title}</h3>
              <p className="price">{offer.priceZar === 0 ? "Free" : formatZar(offer.priceZar)}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
