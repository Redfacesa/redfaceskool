import Link from "next/link";
import { notFound } from "next/navigation";
import PayButton from "@/components/PayButton";
import { instructorBySlug, offerBySlug } from "@/lib/catalog";
import { formatZar, splitRevenue } from "@/lib/domain";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = offerBySlug(slug);
  if (!offer || offer.kind !== "course") notFound();
  const instructor = await instructorBySlug(offer.instructorSlug);
  const split = splitRevenue(offer.priceZar);

  return (
    <main className="stack" style={{ maxWidth: 640 }}>
      <p className="kicker">Course</p>
      <h1>{offer.title}</h1>
      <p className="muted">{offer.summary}</p>
      <p>
        Taught by{" "}
        <Link href={`/instructors/${instructor?.slug}`}>{instructor?.name}</Link>
        {" · "}
        {instructor?.title}
      </p>
      <p>{offer.modules} modules · {offer.hours} hours</p>
      {offer.certificate === "refresco_completion" ? (
        <p className="pill">Refesco certificate of completion</p>
      ) : (
        <p className="pill">Industry certification pathway (not issued by Refesco)</p>
      )}
      {offer.industryPathway ? <p className="muted">{offer.industryPathway}</p> : null}
      <p className="price">{formatZar(offer.priceZar)}</p>
      <p className="muted">
        Instructor share {formatZar(split.instructor)} · Refesco share {formatZar(split.platform)}.
        Payouts are settled through RedFace Pay, not a second Refesco wallet.
      </p>
      <PayButton offerId={offer.id} label="Pay with RedFace Pay" />
    </main>
  );
}
