import Link from "next/link";
import { allInstructors } from "@/lib/catalog";
import { VERIFICATION_LABEL } from "@/lib/domain";

export default async function InstructorsPage() {
  const people = await allInstructors();
  return (
    <main>
      <h1>Instructors</h1>
      <p className="muted">
        People who know something and can teach it. Not a faculty list. Not professors by default.
      </p>
      <div className="grid" style={{ marginTop: 24 }}>
        {people.map((person) => (
          <Link key={person.slug} href={`/instructors/${person.slug}`} className="card">
            <p className="kicker">{person.city} · {person.title}</p>
            <h3>{person.name}</h3>
            <p className="muted">{person.headline}</p>
            <p className="pill ok">{VERIFICATION_LABEL[person.verification]}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
