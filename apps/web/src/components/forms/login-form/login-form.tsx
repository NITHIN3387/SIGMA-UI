import { GithubConnectButton } from "@/components/github-connect-button";
import type { FC } from "react";

export const LoginForm: FC = () => {  
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold uppercase">connect</h2>
        <p className="text-lg font-semibold text-secondary-text-light dark:text-secondary-text-dark">
          Please connect your github account <br className="sm:hidden block" /> to proceed
        </p>
      </header>
      <GithubConnectButton>Connect you github account</GithubConnectButton>
    </div>
  );
};


