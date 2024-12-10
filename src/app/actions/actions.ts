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

export async function CreateProvider(provider:Omit<Providers,'Id' | 'IsActive'>) {
    return await prisma.providers.create({
        data: provider
    });
}

export async function DeleteProvider(id:string) {
    return await prisma.providers.delete({
        where:{
            Id: id
        }
    });
}