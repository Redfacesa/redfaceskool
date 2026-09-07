import { notFound } from "next/navigation";
import { studentByHandle } from "@/lib/catalog";

export default async function StudentPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const student = studentByHandle(handle);
  if (!student) notFound();

  return (
    <main className="stack" style={{ maxWidth: 800, gap: 18 }}>
      <div className="page-head">
        <p className="kicker">Learning identity</p>
        <h1>{student.name}</h1>
        <p className="muted">Public profile. This is a learning CV, not a receipt list. /u/{student.handle}</p>
      </div>

      <section className="panel">
        <div className="panel-body stack">
          <h2>Learning path</h2>
          {student.paths.map((path) => (
            <div key={path.name} className="stack" style={{ gap: 6 }}>
              <p>{path.name} · {path.percent}%</p>
              <div className="bar" aria-hidden>
                <span style={{ width: `${path.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid">
        <article className="card">
          <div className="card-body">
            <p className="kicker">Completed</p>
            <ul>{student.completed.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <p className="kicker">Certificates</p>
            <ul>
              {student.certificates.map((cert) => (
                <li key={cert.name}>
                  {cert.name}
                  {cert.kind === "industry_pathway" ? " · industry credential" : " · RedFace Skool completion"}
                </li>
              ))}
            </ul>
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <p className="kicker">Projects</p>
            <ul>{student.projects.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <p className="kicker">Events</p>
            <ul>{student.events.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </article>
      </div>
    </main>
  );
}
