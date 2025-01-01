"use client";

import { FC, useEffect } from "react";
import { Button, Logo, ThemeToggler } from "@sigma/ui";
import { LoaderCircle, User } from "lucide-react";
import { GithubConnectButton } from "../github-connect-button";
import { useAuthUser } from "@/context/auth-user";
import Image from "next/image";

export const Navbar: FC = () => {
  const authUser = useAuthUser();

  useEffect(() => {}, [authUser]);

  return (
    <nav className="fixed w-screen text-white md:p-8 sm:p-6 p-4 flex justify-between items-center gap-4">
      <Logo />

      <div className="flex items-center md:!gap-8 sm:!gap-4 gap-2">
        <ThemeToggler />
        {authUser !== undefined ? (
          authUser ? (
            <Button
              className="rounded-full bg-gradient-primary text-primary-text-light p-0.5"
              variant="ghost"
            >
              {authUser ? (
                <Image
                  alt="profile-picture"
                  className="rounded-full"
                  height={36}
                  src={authUser.profilePicture}
                  width={36}
                />
              ) : (
                <div className="bg-primary-bg-light rounded-full h-8 w-8 flex justify-center items-center">
                  <User />
                </div>
              )}
            </Button>
          ) : (
            <GithubConnectButton>Connect</GithubConnectButton>
          )
        ) : (
          <LoaderCircle className="animate-spin" />
        )}
      </div>
    </nav>
  );
};
