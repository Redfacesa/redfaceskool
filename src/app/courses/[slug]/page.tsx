import { notFound } from "next/navigation";
import { StudioLayout } from "@/components/StudioLayout";
import { instructorBySlug, offerBySlug } from "@/lib/catalog";
import { splitRevenue, formatZar } from "@/lib/domain";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = offerBySlug(slug);
  if (!offer || offer.kind !== "course") notFound();
  const instructor = await instructorBySlug(offer.instructorSlug);
  const split = splitRevenue(offer.priceZar);

  return (
    <main>
      <StudioLayout
        offer={offer}
        instructor={instructor}
        kindLabel="Course"
        actionLabel="Pay with RedFace Pay"
        extra={
          offer.industryPathway ? (
            <p className="muted">{offer.industryPathway}</p>
          ) : (
            <p className="muted">
              Instructor share {formatZar(split.instructor)} · RedFace Skool share {formatZar(split.platform)}.
            </p>
          )
        }
      />
    </main>
  );
}
