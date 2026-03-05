import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool)

const globalforPrisma = global as unknown as {prisma: PrismaClient};

export const prisma = globalforPrisma.prisma || new PrismaClient({
    adapter,
    log: ['info', 'warn', 'error'],
})

if (process.env.NODE_ENV !== 'production') globalforPrisma.prisma = prisma;