import * as React from "react";
import "@/styles/globals.css";
import "@sigma/ui/styles.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { AuthUserProvider } from "@/context/auth-user";

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
      <body className="text-primary-text-light dark:text-primary-text-dark bg-primary-bg-light dark:bg-primary-bg-dark">
        <AuthUserProvider>
          <Navbar />
          {children}
        </AuthUserProvider>
      </body>
    </html>
  );
}
