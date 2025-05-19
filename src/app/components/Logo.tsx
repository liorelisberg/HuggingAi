"use client";

import { useEffect, useState } from "react";

export function Logo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render the logo after client-side hydration to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-[160px] h-[40px] bg-gray-800/50 rounded-md animate-pulse" />
    );
  }

  return (
    <div className="inline-flex items-center font-extrabold text-5xl sm:text-6xl">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 animate-pulse-slow">
        ViralAi
      </span>
    </div>
  );
}
