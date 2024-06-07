import { PrismaClient } from "@prisma/client";

export const connectToDatabase = async (prisma: PrismaClient) => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to database");
  }
};
