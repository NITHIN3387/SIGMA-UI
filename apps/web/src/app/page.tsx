import type { ReactElement } from "react";
import { inter } from "@sigma/assets/fonts";
import { Button } from "@sigma/ui";

const features = ["build", "share", "reuse"];

export default function HomePage(): ReactElement {
  return (
    <main>
      <section className="h-dvh w-screen flex flex-col justify-center items-center sm:gap-12 gap-8 bg-primary-bg-light dark:bg-primary-bg-dark md:px-8 sm:px-6 px-4">
        <header className="space-y-4">
          <div
            className={`md:text-7xl sm:text-6xl text-3xl font-extrabold text-center bg-gradient-to-br from-white dark:from-black via-black/50 dark:via-white/50 to-black dark:to-white to-50% bg-clip-text text-transparent sm:space-y-4 ${inter.className}`}
          >
            <div className="flex md:!h-16 sm:!h-14 h-10 justify-center overflow-hidden sm:gap-4 gap-2">
              <div className="animate-multi-text text-end">
                {features.map((feature) => (
                  <h1
                    className="bg-gradient-primary bg-clip-text capitalize"
                    key={feature}
                  >
                    {feature}
                  </h1>
                ))}
              </div>
              <h1 className="text-nowrap">Custom UI</h1>
            </div>
            <h1> Libraries Effortlessly</h1>
          </div>
          <p className="md:text-xl sm:text-lg font-semibold text-secondary-text-light dark:text-secondary-text-dark text-center">
            An open-source platform to create, manage, and discover UI
            components.
          </p>
        </header>
        <Button>Get Started</Button>
      </section>
    </main>
  );
}
