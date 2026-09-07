"use client";

import { useState } from "react";

export default function PayButton({ offerId, label }: { offerId: string; label: string }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId, studentEmail: email }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        checkoutUrl?: string;
        enrollmentId?: string;
        error?: string;
      };
      if (!data.ok || !data.checkoutUrl) {
        setError(data.error || "Could not start checkout");
        return;
      }
      if (data.enrollmentId) {
        sessionStorage.setItem("refresco_enrollment", data.enrollmentId);
        sessionStorage.setItem("refresco_email", email.trim().toLowerCase());
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setError("Could not reach checkout");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="stack">
      <label>
        Your email
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </label>
      <button className="btn" type="button" onClick={pay} disabled={busy || !email.includes("@")}>
        {busy ? "Opening RedFace Pay…" : label}
      </button>
      <p className="muted">Card details stay on RedFace Pay. Refesco only records the enrollment.</p>
      {error ? <p className="muted">{error}</p> : null}
    </div>
  );
}
