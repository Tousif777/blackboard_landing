// models/JobApplicationModel.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PrismaJobApplication {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    email: string;
    file: string;
}

interface JobApplicationData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    email: string;
    file: string;
}

const JobApplicationModel = {
    getAllJobApplications: async (): Promise<PrismaJobApplication[]> => {
        return prisma.jobApplication.findMany({
            orderBy: {
                id: 'desc'
            }
        });
    },

    getJobApplicationById: async (applicationId: number): Promise<PrismaJobApplication | null> => {
        return prisma.jobApplication.findUnique({
            where: {
                id: applicationId
            }
        });
    },

    createJobApplication: async (applicationData: JobApplicationData): Promise<PrismaJobApplication> => {
        return prisma.jobApplication.create({
            data: applicationData
        });
    },

    updateJobApplication: async (applicationId: number, updatedData: JobApplicationData): Promise<PrismaJobApplication | null> => {
        return prisma.jobApplication.update({
            where: {
                id: applicationId
            },
            data: updatedData
        });
    },

    deleteJobApplication: async (applicationId: number): Promise<void> => {
        await prisma.jobApplication.delete({
            where: {
                id: applicationId
            }
        });
    },
};

export default JobApplicationModel;
