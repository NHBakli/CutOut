import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth-config";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
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

    if (session.user?.role !== "ADMIN" && user?.id !== UserId) {
      return NextResponse.json(
        {
          error: "Unauthorized access.",
        },
        { status: 403 }
      );
    }

    const { images: imageUrl } = await req.json();

    const images = await prisma.image.create({
      data: {
        userId: UserId,
        url: imageUrl,
      },
    });
    return NextResponse.json({ images }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error!" + error },
      { status: 500 }
    );
  }
};
