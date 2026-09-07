"use client";

import { useMemo, useState } from "react";

const TONES = ["tone-0", "tone-1", "tone-2", "tone-3", "tone-4"] as const;

export function CoverMedia({
  src,
  slug,
  title,
  kicker,
  className = "",
}: {
  src?: string;
  slug: string;
  title: string;
  kicker?: string;
  className?: string;
}) {
  const candidates = useMemo(() => {
    const list = [
      src,
      `/covers/${slug}.jpg`,
      `/covers/${slug}.png`,
      `/covers/${slug}.webp`,
      `/shared/${slug}.jpg`,
      `/shared/${slug}.png`,
    ].filter((item, index, all): item is string => Boolean(item) && all.indexOf(item) === index);
    return list;
  }, [src, slug]);

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const current = candidates[index];
  const tone = TONES[Math.abs(hash(slug)) % TONES.length];

  return (
    <div className={`cover ${className}`}>
      <div className={`fallback-cover ${tone}`} hidden={loaded}>
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h3>{title}</h3>
      </div>
      {current ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={current}
          alt=""
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false);
            setIndex((n) => n + 1);
          }}
          style={{ display: loaded ? "block" : "none" }}
        />
      ) : null}
    </div>
  );
}

function hash(value: string) {
  return [...value].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}
