import { NextResponse } from "next/server";
import { INSTRUCTOR_TITLES, type InstructorTitle } from "@/lib/domain";
import { applyInstructor } from "@/lib/store";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, string>;
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const city = String(body.city || "").trim();
  const headline = String(body.headline || "").trim();
  const title = INSTRUCTOR_TITLES.includes(body.title as InstructorTitle)
    ? (body.title as InstructorTitle)
    : "Instructor";
  const teaches = String(body.teaches || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const experience = String(body.experience || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!name || !email.includes("@") || !city || !headline || teaches.length === 0) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const instructor = await applyInstructor({
    name,
    email,
    title,
    city,
    headline,
    teaches,
    experience: experience.length ? experience : ["Industry practitioner"],
  });

  return NextResponse.json({ ok: true, instructor });
}
