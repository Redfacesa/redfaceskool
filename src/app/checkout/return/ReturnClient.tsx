"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Enrollment = {
  id: string;
  offerTitle: string;
  status: string;
  studentHandle: string;
  checkoutMode: string;
};

export default function CheckoutReturn({
  enrollmentId,
  demo,
  free,
}: {
  enrollmentId: string;
  demo: boolean;
  free: boolean;
}) {
  const [row, setRow] = useState<Enrollment | null>(null);
  const [note, setNote] = useState("Checking payment…");

  useEffect(() => {
    const id = enrollmentId || sessionStorage.getItem("refresco_enrollment") || "";
    if (!id) {
      setNote("No enrollment on this return. Open your learning from the email you used at checkout.");
      return;
    }
    let stop = false;
    async function sync() {
      const res = await fetch(`/api/enrollments/${id}`, { method: "POST" });
      const data = (await res.json()) as { enrollment?: Enrollment; note?: string; providerStatus?: string };
      if (stop) return;
      if (data.enrollment) setRow(data.enrollment);
      if (data.enrollment?.status === "paid" || data.enrollment?.status === "free") {
        setNote("Access is unlocked on RedFace Skool.");
        return;
      }
      setNote(
        data.providerStatus
          ? `RedFace Pay status: ${data.providerStatus}. This page will refresh.`
          : "Waiting for RedFace Pay to confirm.",
      );
      window.setTimeout(sync, 3000);
    }
    void sync();
    return () => {
      stop = true;
    };
  }, [enrollmentId, demo, free]);

  return (
    <main className="stack" style={{ maxWidth: 640 }}>
      <p className="kicker">Enrollment</p>
      <h1>
        {row?.status === "paid" || row?.status === "free"
          ? "You are in"
          : demo
            ? "Demo checkout"
            : "Returned from RedFace Pay"}
      </h1>
      {row ? <p>{row.offerTitle}</p> : null}
      <p className="muted">{note}</p>
      {demo ? (
        <p className="muted">
          No RedFace API key is set, so this enrollment is marked paid in demo mode. Add keys on the Pay setup page to take live money.
        </p>
      ) : null}
      {row?.studentHandle ? (
        <Link className="btn" href={`/u/${row.studentHandle}`}>
          Open learning identity
        </Link>
      ) : null}
      <Link className="btn ghost" href="/account">
        My enrollments
      </Link>
    </main>
  );
}
