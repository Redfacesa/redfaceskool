import { NextResponse } from "next/server";
import { commerceApiBase, isLivePayConfigured } from "@/lib/redfacePay";

export async function GET() {
  return NextResponse.json({
    ok: true,
    live: isLivePayConfigured(),
    commerceApiBase: isLivePayConfigured() ? commerceApiBase() : null,
    businessIdSet: Boolean(process.env.REDFACE_BUSINESS_ID),
  });
}
