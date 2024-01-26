// models/ContactModel.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PrismaContact {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    subject: string;
    message: string;
}

interface ContactData {
    name: string;
    phoneNumber: string;
    email: string;
    subject: string;
    message: string;
}

const ContactModel = {
    getAllContacts: async (): Promise<PrismaContact[]> => {
        return prisma.contact.findMany({
            orderBy : {
                id: 'desc'
            }
        });
    },

    getContactById: async (contactId: number): Promise<PrismaContact | null> => {
        return prisma.contact.findUnique({
            where: {
                id: contactId
            }
        });
    },

    createContact: async (contactData: ContactData): Promise<PrismaContact> => {
        return prisma.contact.create({
            data: contactData
        });
    },

    updateContact: async (contactId: number, updatedData: ContactData): Promise<PrismaContact | null> => {
        return prisma.contact.update({
            where: {
                id: contactId
            },
            data: updatedData
        });
    },

    deleteContact: async (contactId: number): Promise<void> => {
        await prisma.contact.delete({
            where: {
                id: contactId
            }
        });
    },
};

export default ContactModel;
