// models/StudentModel.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PrismaStudent {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    email: string;
    schoolName: string;
    grade: string;
    password: string;
    file: string;
}

interface StudentData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    email: string;
    schoolName: string;
    grade: string;
    password: string;
    file: string;
}

const StudentModel = {
    getAllStudents: async (): Promise<PrismaStudent[]> => {
        return prisma.student.findMany({
            orderBy: {
                id: 'desc'
            }
        });
    },

    getStudentById: async (studentId: number): Promise<PrismaStudent | null> => {
        return prisma.student.findUnique({
            where: {
                id: studentId
            }
        });
    },

    createStudent: async (studentData: StudentData): Promise<PrismaStudent> => {
        return prisma.student.create({
            data: studentData
        });
    },

    updateStudent: async (studentId: number, updatedData: StudentData): Promise<PrismaStudent | null> => {
        return prisma.student.update({
            where: {
                id: studentId
            },
            data: updatedData
        });
    },

    deleteStudent: async (studentId: number): Promise<void> => {
        await prisma.student.delete({
            where: {
                id: studentId
            }
        });
    },
};

export default StudentModel;
