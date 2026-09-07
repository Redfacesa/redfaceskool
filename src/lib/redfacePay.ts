/**
 * RedFace Pay client. RedFace Skool never calls Paystack.
 * POST /payments on Commerce API with rf_live_ / rf_test_ key.
 */

export type CreateCheckoutInput = {
  offerId: string;
  offerKind: string;
  label: string;
  amountZar: number;
  instructorId: string;
  studentEmail: string;
  studentHandle?: string;
  enrollmentId: string;
  returnUrl: string;
};

export type CheckoutResult = {
  mode: "live" | "demo";
  checkoutUrl: string;
  paymentId?: string;
};

const DEFAULT_BASE = "https://bpzzgilwlkghgfkvkkxx.supabase.co/functions/v1/commerce-api";

export function commerceApiBase(): string {
  return process.env.REDFACE_COMMERCE_API_BASE?.replace(/\/$/, "") || DEFAULT_BASE;
}

export function isLivePayConfigured(): boolean {
  return Boolean(process.env.REDFACE_API_KEY);
}

export async function createRedfaceCheckout(input: CreateCheckoutInput): Promise<CheckoutResult> {
  const key = process.env.REDFACE_API_KEY;
  const businessId = process.env.REDFACE_BUSINESS_ID;
  const idempotencyKey = `refresco:${input.enrollmentId}`;

  if (!key) {
    const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const q = new URLSearchParams({
      demo: "1",
      offer: input.offerId,
      enrollment: input.enrollmentId,
    });
    return {
      mode: "demo",
      checkoutUrl: `${site}/checkout/return?${q.toString()}`,
    };
  }

  const res = await fetch(`${commerceApiBase()}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      ...(businessId ? { business_id: businessId } : {}),
      amount: input.amountZar,
      currency: "ZAR",
      label: input.label,
      metadata: {
        origin: "refresco",
        offer_id: input.offerId,
        offer_kind: input.offerKind,
        instructor_id: input.instructorId,
        student_email: input.studentEmail,
        student_handle: input.studentHandle ?? null,
        enrollment_id: input.enrollmentId,
        return_url: input.returnUrl,
        platform_share_bps: 2000,
      },
    }),
  });

  const body = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    data?: { checkout_url?: string; payment_id?: string; session?: { id?: string; status?: string } };
  };

  if (!res.ok || !body.ok || !body.data?.checkout_url) {
    throw new Error(body.error || `RedFace Pay checkout failed (${res.status})`);
  }

  return {
    mode: "live",
    checkoutUrl: body.data.checkout_url,
    paymentId: body.data.payment_id || body.data.session?.id,
  };
}

export async function getRedfacePayment(paymentId: string): Promise<{ status?: string } | null> {
  const key = process.env.REDFACE_API_KEY;
  if (!key) return null;
  const res = await fetch(`${commerceApiBase()}/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  const body = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    data?: { status?: string; session?: { status?: string } };
  };
  if (!body.ok) return null;
  const status = body.data?.status || body.data?.session?.status;
  return { status };
}

export function isPaidStatus(status?: string) {
  const s = String(status || "").toLowerCase();
  return s === "paid" || s === "success" || s === "completed";
}
