"use client";
import React, { useState } from "react";

export default function ImageWithLoader({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [loaded, setLoaded] = useState(false);
  if (!src) {
    return (
      <div style={{ width: "100%", height: "100%", background: "var(--section)" }} />
    );
  }
  return (
    <div
      className={`img-wrap ${loaded ? "loaded" : "loading"}`}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {!loaded && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 100%)",
            animation: "skeleton-shimmer 1.2s linear infinite",
            zIndex: 1,
          }}
        />
      )}
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={className}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 320ms ease, transform 320ms ease, filter 320ms ease",
          ...style,
        }}
      />
      <style>{`
        @keyframes skeleton-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .img-wrap.loading img { filter: blur(6px); transform: scale(1.03); }
        .img-wrap.loaded img { filter: none; transform: none; }
      `}</style>
    </div>
  );
}
