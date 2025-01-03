"use client";

import { useState, useEffect, type ReactElement } from "react";
import { Github, LoaderCircle } from "lucide-react";
import { Button } from "@sigma/ui";
import { ORIGIN } from "@/constants";
import { handleConnect } from "./github-connect-button.utils";
import type { GithubConnectButtonProps } from "./github-connnect-button.type";

export function GithubConnectButton({
  children,
  ...props
}: GithubConnectButtonProps): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [returnTo, setReturnTo] = useState<string>(ORIGIN);

  useEffect(() => {
    setReturnTo(
      new URLSearchParams(window.location.search).get("returnTo") ||
        ORIGIN ||
        window.location.href
    );
  }, []);

  return (
    <Button
      className="bg-zinc-900 hover:bg-zinc-700 disabled:bg-zinc-700 dark:bg-zinc-100 hover:dark:bg-zinc-300 disabled:dark:bg-zinc-300 text-white dark:text-black disabled:cursor-wait"
      disabled={loading}
      onClick={() => {
        handleConnect(returnTo, setLoading);
      }}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : <Github />}
      {children}
    </Button>
  );
}
