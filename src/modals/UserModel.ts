// models/UserModel.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Assuming your User type is named differently, e.g., PrismaUser
interface PrismaUser {
    id: number;
    username: string;
    email: string;
    password: string;
    // Add other fields based on your schema
}

interface UserData {
    username: string;
    email: string;
    password: string;
}

const UserModel = {
    getAllUsers: async (): Promise<PrismaUser[]> => {
        return prisma.user.findMany();
    },

    getUserById: async (userId: number): Promise<PrismaUser | null> => {
        return prisma.user.findUnique({
            where: {
                id: userId
            }
        });
    },

    createUser: async (userData: UserData): Promise<PrismaUser> => {
        return prisma.user.create({
            data: userData
        });
    },
};

export default UserModel;
