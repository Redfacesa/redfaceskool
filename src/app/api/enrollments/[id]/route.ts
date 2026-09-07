import { NextResponse } from "next/server";
import { getRedfacePayment, isPaidStatus } from "@/lib/redfacePay";
import { getEnrollment, markEnrollment } from "@/lib/store";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const row = await getEnrollment(id);
  if (!row) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true, enrollment: row });
}

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const row = await getEnrollment(id);
  if (!row) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  if (row.status === "paid" || row.status === "free") {
    return NextResponse.json({ ok: true, enrollment: row });
  }

  if (row.checkoutMode === "demo") {
    const updated = await markEnrollment(id, {
      status: "paid",
      paidAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, enrollment: updated, note: "demo_marked_paid" });
  }

  if (!row.paymentId) {
    return NextResponse.json({ ok: true, enrollment: row, note: "waiting_for_payment_id" });
  }

  const payment = await getRedfacePayment(row.paymentId);
  if (isPaidStatus(payment?.status)) {
    const updated = await markEnrollment(id, {
      status: "paid",
      paidAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, enrollment: updated });
  }

  return NextResponse.json({ ok: true, enrollment: row, providerStatus: payment?.status ?? "unknown" });
}
