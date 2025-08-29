// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from "../app/generated/prisma/client";

// This prevents multiple instances of Prisma Client in development
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;