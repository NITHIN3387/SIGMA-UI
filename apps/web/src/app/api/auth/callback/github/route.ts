import { NextResponse } from "next/server";
import prisma from "@sigma/database";
import { cookies } from "next/headers";
import { type Secret, sign } from "jsonwebtoken";
import { OAUTH_SECRETS } from "@/constants";
import type { UserType } from "@/types/db.types";
import type { GitHubEmail, GitHubTokenResponse, GitHubUser } from "./types";

export const GET = async (req: Request): Promise<NextResponse> => {
  const url: URL = new URL(req.url);
  const code: string | null = url.searchParams.get("code");
  const returnTo: string | null = url.searchParams.get("state");

  const { CLIENT_ID, CLIENT_SECRET } = OAUTH_SECRETS;

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code not provided!" },
      { status: 400 }
    );
  }

  try {
    const response: Response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        }),
      }
    );

    const data = (await response.json()) as GitHubTokenResponse;

    if (!response.ok) {
      return NextResponse.json(
        { error: data.access_token || "Token exchange failed" },
        { status: response.status }
      );
    }

    const accessToken: string = data.access_token;

    const userResponse: Response = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = (await userResponse.json()) as GitHubUser;

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: user.message || "Failed to fetch user data" },
        { status: userResponse.status }
      );
    }

    const emailResponse: Response = await fetch(
      "https://api.github.com/user/emails",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const emails = (await emailResponse.json()) as GitHubEmail[];

    if (!emailResponse.ok) {
      return NextResponse.json(
        { error: emails[0]?.message || "Failed to fetch user emails" },
        { status: emailResponse.status }
      );
    }

    const primaryEmail: string | undefined = emails.find(
      (email) => email.primary
    )?.email;

    if (!primaryEmail) {
      return NextResponse.json(
        { error: "No primary email found" },
        { status: 400 }
      );
    }

    const duplicateUser = (await prisma.user.findUnique({
      where: { username: user.login },
      select: { username: true, profilePicture: true, email: true },
    })) as UserType | null;

    if (!duplicateUser) {
      await prisma.user.create({
        data: {
          username: user.login,
          profilePicture: user.avatar_url,
          email: primaryEmail,
          accessToken,
        },
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is not defined in the environment variables."
      );
    }

    const token = sign(
      {
        username: user.login,
        profilePicture: user.avatar_url,
        email: primaryEmail,
      },
      JWT_SECRET as Secret,
      { expiresIn: "7d" }
    );

    const cookieStore = cookies();
    cookieStore.set("user", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    if (!returnTo) {
      return NextResponse.json(
        { error: "Return URL is missing!" },
        { status: 400 }
      );
    }

    return NextResponse.redirect(returnTo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
