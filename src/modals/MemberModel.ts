// models/MemberModel.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PrismaMember {
    id: number;
    stripeCustomerId: string;
    firstName: string;
    lastName: string;
    isSubscribed: boolean;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    email: string;
    password: string;
    file: string;
}

interface MemberData {
    stripeCustomerId: string;
    firstName: string;
    lastName: string;
    isSubscribed: boolean;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    email: string;
    password: string;
    file: string;
}

const MemberModel = {
    getAllMembers: async (): Promise<PrismaMember[]> => {
        return prisma.member.findMany({
            orderBy: {
                id: 'desc'
            }
        });
    },

    getMemberById: async (memberId: number): Promise<PrismaMember | null> => {
        return prisma.member.findUnique({
            where: {
                id: memberId
            }
        });
    },

    createMember: async (memberData: MemberData): Promise<PrismaMember> => {
        return prisma.member.create({
            data: memberData
        });
    },

    updateMember: async (memberId: number, updatedData: MemberData): Promise<PrismaMember | null> => {
        return prisma.member.update({
            where: {
                id: memberId
            },
            data: updatedData
        });
    },

    deleteMember: async (memberId: number): Promise<void> => {
        await prisma.member.delete({
            where: {
                id: memberId
            }
        });
    },
};

export default MemberModel;
