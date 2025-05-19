'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export function Logo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render the image after client-side hydration
  if (!mounted) {
    return <div style={{ width: 180, height: 38 }} />;
  }

  return (
    <Image
      src="/next.svg"
      alt="Next.js logo"
      width={180}
      height={38}
      priority
      style={{ display: 'block' }}
    />
  );
} 