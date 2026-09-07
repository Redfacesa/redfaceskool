/** Drop files in public/shared. Same filenames, no code change. */

export const SHARED = {
  logo: "/shared/logo.png",
  wordmark: "/shared/wordmark.png",
  home: "/shared/home.jpg",
} as const;

export function coverPath(slug: string) {
  return `/covers/${slug}.jpg`;
}

export function avatarPath(slug: string) {
  return `/avatars/${slug}.jpg`;
}
