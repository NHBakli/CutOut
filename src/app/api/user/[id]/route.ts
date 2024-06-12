import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/auth-config";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }

    const UserId = session?.user?.id ? parseInt(session.user.id, 10) : null;

    if (!UserId) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: +UserId,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (session.user?.role !== "ADMIN" && user?.id !== UserId) {
      return NextResponse.json(
        {
          error: "Unauthorized access.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const res: any = {};

    const session = await getServerSession({ req, res, ...authOptions });

    if (!session) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }

    const UserId = session?.user?.id ? parseInt(session.user.id, 10) : null;

    if (!UserId) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: +UserId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (session.user?.role !== "ADMIN" && user?.id !== UserId) {
      return NextResponse.json(
        {
          error: "Unauthorized access.",
        },
        { status: 403 }
      );
    }

    const { email, username } = await req.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: +UserId,
      },
      data: {
        email: email || user.email,
        username: username || user.username,
      },
    });

    return NextResponse.json({ updatedUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error!" + error },
      { status: 500 }
    );
  }
};
