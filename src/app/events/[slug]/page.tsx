import { notFound } from "next/navigation";
import { StudioLayout } from "@/components/StudioLayout";
import { instructorBySlug } from "@/lib/catalogServer";
import { offerBySlug } from "@/lib/catalog";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = offerBySlug(slug);
  if (!offer || (offer.kind !== "live" && offer.kind !== "event")) notFound();
  const instructor = await instructorBySlug(offer.instructorSlug);

  return (
    <main>
      <StudioLayout
        offer={offer}
        instructor={instructor}
        kindLabel={offer.kind === "live" ? "Live learning" : "Community"}
        actionLabel={offer.priceZar === 0 ? "Reserve a seat" : "Book with RedFace Pay"}
      />
    </main>
  );
}
