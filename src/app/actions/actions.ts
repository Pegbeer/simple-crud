"use server"
import { PrismaClient, Providers } from "@prisma/client";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const prisma = new PrismaClient();

export async function GetProviders() {
    return await prisma.providers.findMany();
}

export async function UpdateProvider(provider:Providers) {
    return await prisma.providers.update({
        where:{
            Id: provider.Id
        },
        data: provider
    });
}