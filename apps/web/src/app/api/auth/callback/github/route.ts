import { NextResponse } from "next/server";
import prisma from "@sigma/database";
import { cookies } from "next/headers";
import { type Secret, sign } from "jsonwebtoken";
import { OAUTH_SECRETS } from "@/constants";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const returnTo = url.searchParams.get("state");

  const { CLIENT_ID, CLIENT_SECRET } = OAUTH_SECRETS;

  if (!code)
    return NextResponse.json(
      { error: "Authorization code not provided!" },
      { status: 400 }
    );

  try {
    const response = await fetch(
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

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Token exchange failed" },
        { status: response.status }
      );
    }

    const accessToken = data.access_token;

    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = await userResponse.json();

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: user.message || "Failed to fetch user data" },
        { status: userResponse.status }
      );
    }

    const emailResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const emails = await emailResponse.json();

    if (!emailResponse.ok) {
      return NextResponse.json(
        { error: emails.message || "Failed to fetch user emails" },
        { status: emailResponse.status }
      );
    }

    const primaryEmail = emails.find(
      (email: { primary: string }) => email.primary
    )?.email;

    if (!primaryEmail) {
      return NextResponse.json(
        { error: "No primary email found" },
        { status: 400 }
      );
    }

    const duplicateUser = await prisma.user.findUnique({
      where: { username: user.login },
    });

    if (!duplicateUser)
      await prisma.user.create({
        data: {
          username: user.login,
          profilePicture: user.avatar_url,
          email: primaryEmail,
          accessToken,
        },
      });

    const token = sign(
      {
        username: user.login,
        profilePicture: user.avatar_url,
        email: primaryEmail,
      },
      process.env.JWT_SECRET as Secret,
      { expiresIn: "7d" }
    );

    const cookieStore = cookies();
    cookieStore.set("user", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      path: "/", // Cookie available across the site
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.redirect(returnTo as string);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
