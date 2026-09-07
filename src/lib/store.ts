import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Instructor, InstructorTitle } from "./domain";

export type EnrollmentStatus = "pending" | "paid" | "free" | "failed";

export type Enrollment = {
  id: string;
  offerId: string;
  offerTitle: string;
  studentEmail: string;
  studentHandle: string;
  status: EnrollmentStatus;
  paymentId: string | null;
  checkoutMode: "live" | "demo" | "free";
  createdAt: string;
  paidAt: string | null;
};

export type InstructorApplication = Instructor & {
  email: string;
  createdAt: string;
};

type StoreFile = {
  enrollments: Enrollment[];
  instructors: InstructorApplication[];
};

const empty: StoreFile = { enrollments: [], instructors: [] };

function filePath() {
  return path.join(process.cwd(), ".data", "store.json");
}

async function readStore(): Promise<StoreFile> {
  try {
    const raw = await readFile(filePath(), "utf8");
    const parsed = JSON.parse(raw) as StoreFile;
    return {
      enrollments: parsed.enrollments ?? [],
      instructors: parsed.instructors ?? [],
    };
  } catch {
    return { ...empty, enrollments: [], instructors: [] };
  }
}

async function writeStore(data: StoreFile) {
  const dir = path.dirname(filePath());
  await mkdir(dir, { recursive: true });
  await writeFile(filePath(), JSON.stringify(data, null, 2));
}

function id(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "instructor";
}

export async function createEnrollment(input: {
  offerId: string;
  offerTitle: string;
  studentEmail: string;
  studentHandle: string;
  status: EnrollmentStatus;
  paymentId: string | null;
  checkoutMode: Enrollment["checkoutMode"];
}): Promise<Enrollment> {
  const store = await readStore();
  const row: Enrollment = {
    id: id("enr"),
    ...input,
    createdAt: new Date().toISOString(),
    paidAt: input.status === "paid" || input.status === "free" ? new Date().toISOString() : null,
  };
  store.enrollments.unshift(row);
  await writeStore(store);
  return row;
}

export async function getEnrollment(enrollmentId: string) {
  const store = await readStore();
  return store.enrollments.find((row) => row.id === enrollmentId) ?? null;
}

export async function listEnrollments(email: string) {
  const store = await readStore();
  const needle = email.trim().toLowerCase();
  return store.enrollments.filter((row) => row.studentEmail.toLowerCase() === needle);
}

export async function markEnrollment(
  enrollmentId: string,
  patch: Partial<Pick<Enrollment, "status" | "paymentId" | "paidAt" | "checkoutMode">>,
) {
  const store = await readStore();
  const row = store.enrollments.find((item) => item.id === enrollmentId);
  if (!row) return null;
  Object.assign(row, patch);
  await writeStore(store);
  return row;
}

export async function applyInstructor(input: {
  name: string;
  email: string;
  title: InstructorTitle;
  city: string;
  headline: string;
  teaches: string[];
  experience: string[];
}): Promise<InstructorApplication> {
  const store = await readStore();
  let slug = slugify(input.name);
  const taken = new Set(store.instructors.map((row) => row.slug));
  if (taken.has(slug)) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  const row: InstructorApplication = {
    slug,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    title: input.title,
    city: input.city.trim(),
    headline: input.headline.trim(),
    teaches: input.teaches,
    experience: input.experience,
    verification: "unverified",
    instructorSince: String(new Date().getFullYear()),
    createdAt: new Date().toISOString(),
  };
  store.instructors.unshift(row);
  await writeStore(store);
  return row;
}

export async function listOnboardedInstructors() {
  const store = await readStore();
  return store.instructors;
}
