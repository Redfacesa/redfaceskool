"use client";

import { useEffect, useState } from "react";

type PayStatus = {
  live: boolean;
  commerceApiBase: string | null;
  businessIdSet: boolean;
};

export default function PaySetupPage() {
  const [status, setStatus] = useState<PayStatus | null>(null);

  useEffect(() => {
    void fetch("/api/pay/status")
      .then((res) => res.json())
      .then((data) => setStatus(data));
  }, []);

  return (
    <main className="stack" style={{ maxWidth: 720 }}>
      <p className="kicker">RedFace Pay</p>
      <h1>Connect the RedFace Skool merchant</h1>
      <p>
        Live checkout needs a RedFace Pay merchant for RedFace Skool, then an API key in this app only.
        Do not put Paystack keys here.
      </p>
      <ol className="muted">
        <li>On www.redfacepay.co.za, create or approve the RedFace Skool business.</li>
        <li>Complete KYC and bank details so instructors can eventually be paid via subaccounts.</li>
        <li>Create a Commerce API key with the payments scope (rf_live_ or rf_test_).</li>
        <li>Put REDFACE_API_KEY and REDFACE_BUSINESS_ID in redfaceskool/.env.local.</li>
        <li>Restart npm run dev. This page should show live: true.</li>
      </ol>
      <article className="card">
        <p className="kicker">This environment</p>
        <p>Live key loaded: {status ? (status.live ? "yes" : "no (demo checkout)") : "checking…"}</p>
        <p>Business id set: {status ? (status.businessIdSet ? "yes" : "no") : "checking…"}</p>
        {status?.commerceApiBase ? <p className="muted">{status.commerceApiBase}</p> : null}
      </article>
    </main>
  );
}
