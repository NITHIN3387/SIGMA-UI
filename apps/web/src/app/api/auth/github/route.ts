import { OAUTH_SECRETS } from "@/constants";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const returnTo = url.searchParams.get("returnTo")
  const { CLIENT_ID, REDIRECT_URI } = OAUTH_SECRETS

  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${returnTo}&scope=read:user user:email`;
  return NextResponse.redirect(githubAuthURL);
};
