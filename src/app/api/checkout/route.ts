import { NextResponse } from "next/server";
import { offerById } from "@/lib/catalog";
import { createRedfaceCheckout } from "@/lib/redfacePay";
import { createEnrollment, markEnrollment } from "@/lib/store";

function handleFromEmail(email: string) {
  return email.split("@")[0]?.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase() || "student";
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    offerId?: string;
    studentEmail?: string;
    studentHandle?: string;
  };
  const offer = body.offerId ? offerById(body.offerId) : null;
  const email = String(body.studentEmail || "").trim().toLowerCase();
  if (!offer) return NextResponse.json({ ok: false, error: "unknown_offer" }, { status: 404 });
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "email_required" }, { status: 400 });
  }
  const studentHandle = (body.studentHandle || handleFromEmail(email)).replace(/^@/, "");

  if (offer.priceZar <= 0) {
    const enrollment = await createEnrollment({
      offerId: offer.id,
      offerTitle: offer.title,
      studentEmail: email,
      studentHandle,
      status: "free",
      paymentId: null,
      checkoutMode: "free",
    });
    return NextResponse.json({
      ok: true,
      mode: "free",
      enrollmentId: enrollment.id,
      checkoutUrl: `/checkout/return?enrollment=${enrollment.id}&free=1`,
    });
  }

  const site =
    process.env.REDFACE_CHECKOUT_RETURN_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const enrollment = await createEnrollment({
    offerId: offer.id,
    offerTitle: offer.title,
    studentEmail: email,
    studentHandle,
    status: "pending",
    paymentId: null,
    checkoutMode: "demo",
  });

  try {
    const checkout = await createRedfaceCheckout({
      offerId: offer.id,
      offerKind: offer.kind,
      label: `Refesco · ${offer.title}`,
      amountZar: offer.priceZar,
      instructorId: offer.instructorSlug,
      studentEmail: email,
      studentHandle,
      enrollmentId: enrollment.id,
      returnUrl: `${site.replace(/\/$/, "")}/checkout/return?enrollment=${enrollment.id}`,
    });
    await markEnrollment(enrollment.id, {
      paymentId: checkout.paymentId ?? null,
      checkoutMode: checkout.mode,
    });
    const checkoutUrl =
      checkout.mode === "demo"
        ? checkout.checkoutUrl
        : checkout.checkoutUrl;
    return NextResponse.json({
      ok: true,
      ...checkout,
      enrollmentId: enrollment.id,
      checkoutUrl,
    });
  } catch (err) {
    await markEnrollment(enrollment.id, { status: "failed" });
    const message = err instanceof Error ? err.message : "checkout_failed";
    return NextResponse.json({ ok: false, error: message, enrollmentId: enrollment.id }, { status: 502 });
  }
}
