// models/TeacherModel.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PrismaTeacher {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    email: string;
    password: string;
    file: string;
}

interface TeacherData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    email: string;
    password: string;
    file: string;
}

const TeacherModel = {
    getAllTeachers: async (): Promise<PrismaTeacher[]> => {
        return prisma.teacher.findMany({
            orderBy : {
                id: 'desc'
            }
        });
    },

    getTeacherById: async (teacherId: number): Promise<PrismaTeacher | null> => {
        return prisma.teacher.findUnique({
            where: {
                id: teacherId
            }
        });
    },

    createTeacher: async (teacherData: TeacherData): Promise<PrismaTeacher> => {
        return prisma.teacher.create({
            data: teacherData
        });
    },

    updateTeacher: async (teacherId: number, updatedData: TeacherData): Promise<PrismaTeacher | null> => {
        return prisma.teacher.update({
            where: {
                id: teacherId
            },
            data: updatedData
        });
    },

    deleteTeacher: async (teacherId: number): Promise<void> => {
        await prisma.teacher.delete({
            where: {
                id: teacherId
            }
        });
    },
};

export default TeacherModel;
