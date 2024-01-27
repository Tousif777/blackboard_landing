// models/SchoolModel.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PrismaSchool {
    id: number;
    schoolName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    message: string;
    address: string;
    city: string;
    country: string;
    email: string;
    password: string;
    file: string;
}

interface SchoolData {
    schoolName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    message: string;
    address: string;
    city: string;
    country: string;
    email: string;
    password: string;
    file: string;
}

const SchoolModel = {
    getAllSchools: async (): Promise<PrismaSchool[]> => {
        return prisma.school.findMany({
            orderBy: {
                id: 'desc'
            }
        });
    },

    getSchoolById: async (schoolId: number): Promise<PrismaSchool | null> => {
        return prisma.school.findUnique({
            where: {
                id: schoolId
            }
        });
    },

    createSchool: async (schoolData: SchoolData): Promise<PrismaSchool> => {
        return prisma.school.create({
            data: schoolData
        });
    },

    updateSchool: async (schoolId: number, updatedData: SchoolData): Promise<PrismaSchool | null> => {
        return prisma.school.update({
            where: {
                id: schoolId
            },
            data: updatedData
        });
    },

    deleteSchool: async (schoolId: number): Promise<void> => {
        await prisma.school.delete({
            where: {
                id: schoolId
            }
        });
    },
};

export default SchoolModel;
