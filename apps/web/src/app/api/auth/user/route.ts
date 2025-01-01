import { type Secret, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@sigma/database";
import type { UserType } from "@/types/db.types";

export const GET = async (req: Request): Promise<NextResponse> => {
  const cookiesStore = cookies();

  const token =
    req.headers.get("authorization")?.split("Bearer ")[1] ||
    cookiesStore.get("user")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized request" },
      { status: 401 }
    );
  }

  try {
    // Ensure `decoded` has a defined type
    const decoded = verify(token, process.env.JWT_SECRET as Secret) as UserType;

    if (!decoded.email) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user: decoded });
  } catch (error) {
    console.error("Error during token verification:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
