import { NextResponse } from "next/server";
import { listEnrollments } from "@/lib/store";

export async function GET(req: Request) {
  const email = new URL(req.url).searchParams.get("email")?.trim().toLowerCase() || "";
  if (!email.includes("@")) {
    return NextResponse.json({ ok: false, error: "email_required" }, { status: 400 });
  }
  const enrollments = await listEnrollments(email);
  return NextResponse.json({ ok: true, enrollments });
}
