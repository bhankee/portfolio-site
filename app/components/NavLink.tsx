"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavLink({ label, href, onClick, className }: any) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const finalHref = mounted && pathname !== "/" ? `/${href}` : href;

  return (
    <Link href={finalHref} scroll className={className} onClick={onClick}>
      {label}
    </Link>
  );
}
