"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type Enrollment = {
  id: string;
  offerTitle: string;
  status: string;
  createdAt: string;
};

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [rows, setRows] = useState<Enrollment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load(event: FormEvent) {
    event.preventDefault();
    setError(null);
    const res = await fetch(`/api/enrollments?email=${encodeURIComponent(email)}`);
    const data = (await res.json()) as { ok?: boolean; enrollments?: Enrollment[]; error?: string };
    if (!data.ok) {
      setError(data.error || "Could not load");
      setRows(null);
      return;
    }
    setRows(data.enrollments || []);
  }

  return (
    <main className="stack" style={{ maxWidth: 640 }}>
      <p className="kicker">Students</p>
      <h1>My enrollments</h1>
      <p className="muted">Look up by the email you used at checkout. This is not a password account yet.</p>
      <form className="stack" onSubmit={load}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button className="btn" type="submit">
          Find enrollments
        </button>
      </form>
      {error ? <p className="muted">{error}</p> : null}
      {rows?.length === 0 ? <p className="muted">No enrollments for that email.</p> : null}
      {rows?.map((row) => (
        <article key={row.id} className="card">
          <p className="kicker">{row.status}</p>
          <h3>{row.offerTitle}</h3>
          <p className="muted">{new Date(row.createdAt).toLocaleString("en-ZA")}</p>
          <Link href={`/checkout/return?enrollment=${row.id}`}>Refresh payment status</Link>
        </article>
      ))}
    </main>
  );
}
