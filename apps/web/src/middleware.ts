import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ORIGIN } from "./constants";

const middleware = async (req: Request): Promise<NextResponse<unknown>> => {
  const cookiesStore = cookies();

  const token = cookiesStore.get("user")?.value;

  if (!token) {
    return NextResponse.redirect(`${ORIGIN}/connect?returnTo=${req.url}`);
  }

  try {
    const response = await fetch(`${ORIGIN}/api/auth/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        authorization: `Berear ${token}`,
      },
    });

    if (!response.ok)
      return NextResponse.redirect(`${ORIGIN}/connect?returnTo=${req.url}`);

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const config = {
  matcher: "/temp",
};

export default middleware;
