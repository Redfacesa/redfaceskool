import { notFound } from "next/navigation";
import { studentByHandle } from "@/lib/catalog";

export default async function StudentPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const student = studentByHandle(handle);
  if (!student) notFound();

  return (
    <main className="stack" style={{ maxWidth: 720 }}>
      <p className="kicker">Learning identity</p>
      <h1>{student.name}</h1>
      <p className="muted">Shareable profile. This is a learning CV, not a course receipt list.</p>
      <p className="muted">refesco.com/u/{student.handle}</p>

      <h2>Learning path</h2>
      {student.paths.map((path) => (
        <div key={path.name} className="stack">
          <p>{path.name} · {path.percent}%</p>
          <div className="bar" aria-hidden>
            <span style={{ width: `${path.percent}%` }} />
          </div>
        </div>
      ))}

      <h2>Completed</h2>
      <ul>{student.completed.map((item) => <li key={item}>{item}</li>)}</ul>

      <h2>Certificates</h2>
      <ul>
        {student.certificates.map((cert) => (
          <li key={cert.name}>
            {cert.name}
            {cert.kind === "industry_pathway" ? " · industry credential (not issued by Refesco)" : " · Refesco completion"}
          </li>
        ))}
      </ul>

      <h2>Projects</h2>
      <ul>{student.projects.map((item) => <li key={item}>{item}</li>)}</ul>

      <h2>Events attended</h2>
      <ul>{student.events.map((item) => <li key={item}>{item}</li>)}</ul>
    </main>
  );
}
