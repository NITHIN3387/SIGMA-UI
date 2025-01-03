import Link from "next/link";
import type { ReactElement } from "react";

export function Logo(): ReactElement {
  return (
    <Link
      className="sm:text-2xl text-xl font-bold text-nowrap text-primary-text-light dark:text-primary-text-dark"
      href="/"
    >
      SIGMA-UI
    </Link>
  );
}
