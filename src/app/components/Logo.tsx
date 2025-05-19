'use client';

import { useEffect, useState } from "react";

export function Logo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render the logo after client-side hydration to avoid hydration mismatch
  if (!mounted) {
    return <div className="w-[160px] h-[40px] bg-gray-800/50 rounded-md animate-pulse" />;
  }

  return (
    <div className="font-bold text-2xl inline-flex items-center">
      <span className="text-blue-300 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] animate-pulse-glow">Viral</span>
      <span className="relative mx-[-2px]">
        <span className="text-transparent">A</span>
        <span className="absolute left-0 top-0 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-text-shimmer">A</span>
      </span>
      <span className="text-blue-300 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] animate-pulse-glow">i</span>
    </div>
  );
} 