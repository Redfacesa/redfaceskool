"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { BRAND } from "@/lib/brand";
import { SHARED } from "@/lib/media";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Learn" },
  { href: "/events", label: "Live" },
  { href: "/instructors", label: "People" },
  { href: "/u/manace", label: "Identity" },
  { href: "/account", label: "Library" },
  { href: "/teach", label: "Teach" },
];

const DOCK = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Learn" },
  { href: "/events", label: "Live" },
  { href: "/account", label: "Me" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [logoFailed, setLogoFailed] = useState(false);

  function search(event: FormEvent) {
    event.preventDefault();
    const value = q.trim();
    router.push(value ? `/courses?q=${encodeURIComponent(value)}` : "/courses");
  }

  function on(href: string) {
    if (href === "/") return path === "/";
    return path === href || path.startsWith(`${href}/`);
  }

  return (
    <div className="os">
      <aside className="rail">
        <Link className="brand-block" href="/">
          {logoFailed ? (
            <span className="brand-mark">{BRAND.mark}</span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="brand-mark"
              src={SHARED.logo}
              alt=""
              onError={() => setLogoFailed(true)}
            />
          )}
          <span>
            <span className="brand-name">{BRAND.name}</span>
            <span className="brand-sub" style={{ display: "block" }}>{BRAND.line}</span>
          </span>
        </Link>
        <nav className="rail-nav">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={on(item.href) ? "on" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="rail-foot">
          <p>Checkout stays on RedFace Pay. {BRAND.name} never takes card numbers.</p>
          <Link href="/setup/pay">Payment connection</Link>
        </div>
      </aside>

      <div className="stage">
        <header className="topbar">
          <form className="search" onSubmit={search}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find a course, workshop, or person"
              aria-label={`Search ${BRAND.name}`}
            />
          </form>
          <Link className="chip" href="/u/manace">
            <span className="avatar">M</span>
            Manace
          </Link>
        </header>
        <div className="canvas">{children}</div>
        <p className="site-note" style={{ padding: "0 22px 24px" }}>
          {BRAND.name} is a {BRAND.line} marketplace. Instructors are not employed as professors. Payments run through RedFace Pay.
        </p>
      </div>

      <nav className="dock" aria-label="Primary">
        {DOCK.map((item) => (
          <Link key={item.href} href={item.href} className={on(item.href) ? "on" : ""}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
