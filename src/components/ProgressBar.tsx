"use client";

import { useEffect, useState } from "react";

export default function ProgressBar({ color = "#6366f1" }: { color?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[200] bg-white/[0.04]">
      <div
        className="h-full transition-[width] duration-100 ease-linear"
        style={{ width: `${progress}%`, background: color }}
      />
    </div>
  );
}
