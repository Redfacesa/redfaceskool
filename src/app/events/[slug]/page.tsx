import Link from "next/link";
import { notFound } from "next/navigation";
import PayButton from "@/components/PayButton";
import { instructorBySlug, offerBySlug } from "@/lib/catalog";
import { formatZar } from "@/lib/domain";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = offerBySlug(slug);
  if (!offer || (offer.kind !== "live" && offer.kind !== "event")) notFound();
  const instructor = await instructorBySlug(offer.instructorSlug);
  const when = offer.startsAt
    ? new Date(offer.startsAt).toLocaleString("en-ZA", { dateStyle: "full", timeStyle: "short" })
    : null;

  return (
    <main className="stack" style={{ maxWidth: 640 }}>
      <p className="kicker">{offer.kind === "live" ? "Live learning" : "Community"}</p>
      <h1>{offer.title}</h1>
      <p className="muted">{offer.summary}</p>
      {when ? <p>{when}</p> : null}
      <p>
        Hosted by <Link href={`/instructors/${instructor?.slug}`}>{instructor?.name}</Link>
      </p>
      <p className="price">{offer.priceZar === 0 ? "Free to members" : formatZar(offer.priceZar)}</p>
      <PayButton
        offerId={offer.id}
        label={offer.priceZar === 0 ? "Reserve a seat" : "Book with RedFace Pay"}
      />
    </main>
  );
}
