import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const { username, email, password } = await req.json();
    if (!username || !email || !password)
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmail)
      return NextResponse.json(
        { message: "This email already exists" },
        { status: 409 }
      );

    const userData = {
      email,
      username,
      password: hashedPassword,
    };

    const user = await prisma.user.create({
      data: userData,
    });

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error!" }, { status: 500 });
  }
};
