"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, MouseEventHandler } from "react";

interface NavLinkProps {
  label: string;
  href: string; // anchor or route fragment, e.g. "#about"
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function NavLink({
  label,
  href,
  onClick,
  className,
}: NavLinkProps) {
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
