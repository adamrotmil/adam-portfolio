"use client";

import { useState } from "react";
import { assetPath } from "@/lib/basePath";

export default function ImagePlaceholder({
  height = 400,
  label = "Project Image",
  dark = false,
  src,
  objectPosition = "center",
}: {
  height?: number;
  label?: string;
  dark?: boolean;
  src?: string;
  objectPosition?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full rounded-[14px] flex items-center justify-center relative overflow-hidden transition-transform duration-500"
      style={{
        height,
        background: src
          ? undefined
          : dark
            ? "linear-gradient(145deg, #1a1a2e, #0f0f1a)"
            : "linear-gradient(145deg, #1e1e22, #16161a)",
        transform: hovered ? "scale(1.005)" : "scale(1)",
      }}
    >
      {src ? (
        <img
          src={assetPath(src)}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition }}
        />
      ) : (
        <>
          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: dark
                ? "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)"
                : "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <span className="font-sans text-[0.78rem] text-text-muted/40 tracking-[0.06em] uppercase z-10 text-center px-4">
            {label}
          </span>
        </>
      )}
    </div>
  );
}
