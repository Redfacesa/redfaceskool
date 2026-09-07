"use client";

import { FormEvent, useState } from "react";
import { INSTRUCTOR_TITLES } from "@/lib/domain";

export default function InstructorApplyForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    const form = new FormData(event.currentTarget);
    const res = await fetch("/api/instructors/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        title: form.get("title"),
        city: form.get("city"),
        headline: form.get("headline"),
        teaches: form.get("teaches"),
        experience: form.get("experience"),
      }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string; instructor?: { slug: string } };
    setBusy(false);
    if (!data.ok) {
      setStatus(data.error || "Could not save profile");
      return;
    }
    setSlug(data.instructor?.slug || null);
    setStatus("Profile created as Unverified. Verification is a later review, not a PDF upload.");
  }

  return (
    <form className="stack" onSubmit={onSubmit}>
      <label>
        Full name
        <input name="name" required minLength={2} />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Title
        <select name="title" defaultValue="Instructor">
          {INSTRUCTOR_TITLES.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </label>
      <label>
        City
        <input name="city" required placeholder="Cape Town" />
      </label>
      <label>
        Headline
        <input name="headline" required placeholder="What you actually do" />
      </label>
      <label>
        Teaches (comma separated)
        <input name="teaches" required placeholder="Python, AI agents" />
      </label>
      <label>
        Experience (one line each)
        <textarea name="experience" placeholder="7 years software engineering" />
      </label>
      <button className="btn" type="submit" disabled={busy}>
        {busy ? "Saving…" : "Publish instructor profile"}
      </button>
      {status ? <p className="muted">{status}</p> : null}
      {slug ? (
        <p>
          <a href={`/instructors/${slug}`}>View your public profile</a>
        </p>
      ) : null}
    </form>
  );
}
