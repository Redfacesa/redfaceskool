import Link from "next/link";
import { allInstructors, offers } from "@/lib/catalog";
import { formatZar } from "@/lib/domain";

export default async function CoursesPage() {
  const people = await allInstructors();
  const courses = offers.filter((o) => o.kind === "course");
  return (
    <main>
      <h1>Courses</h1>
      <p className="muted">Buy access. Instructors earn. Refesco takes a marketplace share. Money moves on RedFace Pay.</p>
      <div className="grid" style={{ marginTop: 24 }}>
        {courses.map((offer) => {
          const instructor = people.find((p) => p.slug === offer.instructorSlug);
          return (
            <Link key={offer.id} href={`/courses/${offer.slug}`} className="card">
              <p className="kicker">{offer.modules} modules · {offer.hours} hours</p>
              <h3>{offer.title}</h3>
              <p className="muted">{offer.summary}</p>
              <p className="muted">{instructor?.name}</p>
              <p className="price">{formatZar(offer.priceZar)}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
