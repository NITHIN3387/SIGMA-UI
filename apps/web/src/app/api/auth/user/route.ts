import { type Secret, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@sigma/database"
import type { UserType } from "@/types/db.types";

export const GET = async (req: Request) => {
  const cookiesStore = cookies();

  const token =
    req.headers.get("authorization")?.split("Berear ")[1] ||
    cookiesStore.get("user")?.value;

  if (!token)
    return NextResponse.json(
      { message: "unauthorized request" },
      { status: 401 }
    );

  try {
    const decoded = verify(token as string, process.env.JWT_SECRET as Secret);

    const user = await prisma.user.findUnique({
      where: { email: (decoded as UserType).email },
    });

    return user
      ? NextResponse.json({ user: decoded })
      : NextResponse.json({ message: "unauthorized request" }, { status: 401 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
