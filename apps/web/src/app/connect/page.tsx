import { type FC } from "react";
import { LoginForm } from "@/components/forms/login-form";

const ConnectPage: FC = () => {
  return (
    <div className="h-dvh w-screen flex justify-center items-center p-4">
      <LoginForm />
    </div>
  );
};

export default ConnectPage;
