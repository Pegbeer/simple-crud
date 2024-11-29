import { PrismaClient } from "@prisma/client";

export abstract class Database {
    private static instance:PrismaClient;

    private constructor(){

    }

    public static getInstance():PrismaClient{
        if(!this.instance){
            this.instance = new PrismaClient();
            this.instance.$connect();
        }
        return this.instance;
    }
}