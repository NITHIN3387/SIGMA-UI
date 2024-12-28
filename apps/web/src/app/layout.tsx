import * as React from "react";
import "@/styles/globals.css";
import "@sigma/ui/styles.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIGMA-UI",
  description: "component store management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
