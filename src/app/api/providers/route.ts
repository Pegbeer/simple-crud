import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    const providers = await prisma.providers.findMany();
    return NextResponse.json(providers);
}