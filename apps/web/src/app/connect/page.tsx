import type { ReactElement } from "react";
import { LoginForm } from "@/components/forms/login-form";

export default function ConnectPage(): ReactElement {
  return (
    <div className="h-dvh w-screen flex justify-center items-center p-4">
      <LoginForm />
    </div>
  );
};
