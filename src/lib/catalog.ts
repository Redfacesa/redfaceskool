import type { Instructor, LearningOffer, StudentProfile } from "./domain";
import { listOnboardedInstructors } from "./store";

export const instructors: Instructor[] = [
  {
    slug: "john-smith",
    name: "John Smith",
    title: "Industry professional",
    city: "Cape Town",
    headline: "AI engineer. Builds agents and payment automations.",
    teaches: ["AI agents", "Python", "OpenAI APIs", "Automation"],
    experience: [
      "7 years software engineering",
      "Shipped production AI tools for African SMEs",
    ],
    verification: "professional_verified",
    instructorSince: "2026",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    slug: "thandi-moyo",
    name: "Thandi Moyo",
    title: "Instructor",
    city: "Johannesburg",
    headline: "Payments and fintech operator.",
    teaches: ["Payment systems", "Reconciliation", "Product"],
    experience: ["Led merchant operations at a regional payments company"],
    verification: "identity_verified",
    instructorSince: "2026",
  },
];

export const offers: LearningOffer[] = [
  {
    id: "course-python-beginners",
    slug: "python-for-beginners",
    kind: "course",
    title: "Python for beginners",
    summary: "Eight modules to write real scripts, not slides.",
    instructorSlug: "john-smith",
    priceZar: 499,
    hours: 12,
    modules: 8,
    certificate: "refresco_completion",
  },
  {
    id: "course-ai-agents",
    slug: "building-ai-agents",
    kind: "course",
    title: "Building AI agents",
    summary: "Design, tool, and ship an agent you can demo to an employer.",
    instructorSlug: "john-smith",
    priceZar: 799,
    hours: 16,
    modules: 10,
    certificate: "refresco_completion",
    industryPathway: "Prepare later for vendor AI certifications. Those credentials are not issued by Refesco.",
  },
  {
    id: "live-ai-workshop",
    slug: "ai-automation-workshop",
    kind: "live",
    title: "AI automation workshop",
    summary: "One Saturday session. Bring a laptop. Leave with a working flow.",
    instructorSlug: "john-smith",
    priceZar: 250,
    startsAt: "2026-09-20T14:00:00+02:00",
    seats: 24,
    certificate: "refresco_completion",
  },
  {
    id: "event-fintech-meetup",
    slug: "fintech-builders-meetup",
    kind: "event",
    title: "Fintech builders meetup",
    summary: "Free community night. Talks, then conversation.",
    instructorSlug: "thandi-moyo",
    priceZar: 0,
    startsAt: "2026-09-27T18:00:00+02:00",
    certificate: "refresco_completion",
  },
  {
    id: "course-aws-fundamentals",
    slug: "aws-cloud-fundamentals",
    kind: "course",
    title: "AWS cloud fundamentals",
    summary: "Refesco course taught by an instructor. Not an AWS certificate.",
    instructorSlug: "thandi-moyo",
    priceZar: 650,
    hours: 10,
    modules: 6,
    certificate: "industry_pathway",
    industryPathway: "Prep for AWS Certified Cloud Practitioner. The exam and badge come from AWS.",
  },
];

export const demoStudent: StudentProfile = {
  handle: "manace",
  name: "Manace",
  paths: [
    { name: "AI and automation", percent: 80 },
    { name: "Payments", percent: 60 },
    { name: "Software development", percent: 70 },
  ],
  completed: ["Python fundamentals", "AI automation", "Payment systems"],
  certificates: [
    { name: "Python for beginners", kind: "refresco_completion" },
    { name: "AWS Cloud Practitioner (external)", kind: "industry_pathway" },
  ],
  projects: ["AI customer support agent", "Payment dashboard", "Lead generation system"],
  events: ["AI Africa 2026", "Fintech builders meetup", "Refesco AI workshop"],
};

export async function allInstructors(): Promise<Instructor[]> {
  const extra = await listOnboardedInstructors();
  const bySlug = new Map<string, Instructor>();
  for (const person of instructors) bySlug.set(person.slug, person);
  for (const person of extra) bySlug.set(person.slug, person);
  return [...bySlug.values()];
}

export async function instructorBySlug(slug: string) {
  const list = await allInstructors();
  return list.find((i) => i.slug === slug) ?? null;
}

export function offerBySlug(slug: string) {
  return offers.find((o) => o.slug === slug) ?? null;
}

export function offerById(id: string) {
  return offers.find((o) => o.id === id) ?? null;
}

export function offersForInstructor(slug: string) {
  return offers.filter((o) => o.instructorSlug === slug);
}

export function studentByHandle(handle: string) {
  if (handle.toLowerCase() === demoStudent.handle) return demoStudent;
  return null;
}
