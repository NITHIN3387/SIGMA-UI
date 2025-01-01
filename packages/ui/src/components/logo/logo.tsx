import Link from "next/link";
import type { FC } from "react";

export const Logo: FC = () => {
  return (
    <Link className="sm:text-2xl text-xl font-bold text-nowrap text-primary-text-light dark:text-primary-text-dark" href="/">
      SIGMA-UI
    </Link>
  );
};
