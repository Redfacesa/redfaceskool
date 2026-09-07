/** Frozen marketplace language. Do not invent parallel titles. */

export const INSTRUCTOR_TITLES = [
  "Instructor",
  "Educator",
  "Lecturer",
  "Expert",
  "Mentor",
  "Industry professional",
  "Course creator",
] as const;

export type InstructorTitle = (typeof INSTRUCTOR_TITLES)[number];

export const VERIFICATION_LEVELS = [
  "unverified",
  "identity_verified",
  "professional_verified",
  "credential_verified",
  "refesco_expert",
] as const;

export type VerificationLevel = (typeof VERIFICATION_LEVELS)[number];

export const VERIFICATION_LABEL: Record<VerificationLevel, string> = {
  unverified: "Unverified",
  identity_verified: "Identity verified",
  professional_verified: "Professional verified",
  credential_verified: "Credential verified",
  refesco_expert: "Refesco expert",
};

export type OfferKind = "course" | "live" | "event";

export type CertificateKind = "refresco_completion" | "industry_pathway";

export type Instructor = {
  slug: string;
  name: string;
  title: InstructorTitle;
  city: string;
  headline: string;
  teaches: string[];
  experience: string[];
  verification: VerificationLevel;
  instructorSince: string;
  github?: string;
  linkedin?: string;
};

export type LearningOffer = {
  id: string;
  slug: string;
  kind: OfferKind;
  title: string;
  summary: string;
  instructorSlug: string;
  priceZar: number;
  hours?: number;
  modules?: number;
  startsAt?: string;
  certificate: CertificateKind;
  industryPathway?: string;
  seats?: number;
};

export type StudentProfile = {
  handle: string;
  name: string;
  paths: Array<{ name: string; percent: number }>;
  completed: string[];
  certificates: Array<{ name: string; kind: CertificateKind }>;
  projects: string[];
  events: string[];
};

export const DEFAULT_INSTRUCTOR_SHARE = 0.8;
export const DEFAULT_PLATFORM_SHARE = 0.2;

export function splitRevenue(priceZar: number): { instructor: number; platform: number } {
  const instructor = Math.round(priceZar * DEFAULT_INSTRUCTOR_SHARE * 100) / 100;
  const platform = Math.round((priceZar - instructor) * 100) / 100;
  return { instructor, platform };
}

export function formatZar(amount: number): string {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(amount);
}
