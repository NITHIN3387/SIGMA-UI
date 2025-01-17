"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { Button, Logo, ThemeToggler } from "@sigma/ui";
import { useAuthUser } from "@/context/auth-user";
import { GithubConnectButton } from "../github-connect-button";

export function Navbar(): ReactElement {
  const authUser = useAuthUser();

  let userProfile;

  if (authUser === undefined) {
    userProfile = <LoaderCircle className="animate-spin" />;
  } else if (authUser) {
    userProfile = (
      <Button
        className="rounded-full bg-gradient-primary text-primary-text-light p-0.5"
        variant="ghost"
      >
        <Image
          alt="profile-picture"
          className="rounded-full"
          height={36}
          src={authUser.profilePicture}
          width={36}
        />
      </Button>
    );
  } else {
    userProfile = <GithubConnectButton>Connect</GithubConnectButton>;
  }

  return (
    <nav className="fixed w-screen text-white md:p-8 sm:p-6 p-4 flex justify-between items-center gap-4">
      <Logo />
      <div className="flex items-center md:!gap-8 sm:!gap-4 gap-2">
        <ThemeToggler />
        {userProfile}
      </div>
    </nav>
  );
};
