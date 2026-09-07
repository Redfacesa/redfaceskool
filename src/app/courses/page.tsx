import { CatalogBoard } from "@/components/CatalogBoard";
import { offers } from "@/lib/catalog";
import { allInstructors } from "@/lib/catalogServer";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const people = await allInstructors();
  const courses = offers.filter((o) => o.kind === "course");
  return (
    <main>
      <div className="page-head">
        <p className="kicker">Learn</p>
        <h1>Courses you can start now</h1>
        <p className="muted">Buy access. Instructors earn. Money moves on RedFace Pay.</p>
      </div>
      <CatalogBoard offers={courses} instructors={people} initialQuery={q || ""} kinds={["course"]} />
    </main>
  );
}
