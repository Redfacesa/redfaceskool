import Link from "next/link";
import { CoverMedia } from "@/components/CoverMedia";
import { allInstructors } from "@/lib/catalogServer";
import { VERIFICATION_LABEL } from "@/lib/domain";
import { avatarPath } from "@/lib/media";

export default async function InstructorsPage() {
  const people = await allInstructors();
  return (
    <main>
      <div className="page-head">
        <p className="kicker">People</p>
        <h1>Instructors on the floor</h1>
        <p className="muted">People who know something and can teach it. Not a faculty list.</p>
      </div>
      <div className="grid">
        {people.map((person) => (
          <Link key={person.slug} href={`/instructors/${person.slug}`} className="card">
            <CoverMedia className="portrait" src={avatarPath(person.slug)} slug={person.slug} title={person.name} kicker={person.city} />
            <div className="card-body">
              <p className="kicker">{person.city} · {person.title}</p>
              <h3>{person.name}</h3>
              <p className="muted">{person.headline}</p>
              <p className="pill ok">{VERIFICATION_LABEL[person.verification]}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
