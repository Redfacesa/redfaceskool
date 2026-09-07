import type { Instructor } from "./domain";
import { instructors } from "./catalog";
import { listOnboardedInstructors } from "./store";

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
