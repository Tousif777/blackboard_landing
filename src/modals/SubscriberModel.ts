// models/SubscriberModel.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PrismaSubscriber {
    id: number;
    email: string;
    subscribedAt: Date;
}

interface SubscriberData {
    email: string;
    subscribedAt: Date;
}

const SubscriberModel = {
    getAllSubscribers: async (): Promise<PrismaSubscriber[]> => {
        return prisma.subscriber.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    },

    getSubscriberById: async (subscriberId: number): Promise<PrismaSubscriber | null> => {
        return prisma.subscriber.findUnique({
            where: {
                id: subscriberId
            }
        });
    },

    createSubscriber: async (subscriberData: SubscriberData): Promise<PrismaSubscriber> => {
        return prisma.subscriber.create({
            data: subscriberData
        });
    },

    updateSubscriber: async (subscriberId: number, updatedData: SubscriberData): Promise<PrismaSubscriber | null> => {
        return prisma.subscriber.update({
            where: {
                id: subscriberId
            },
            data: updatedData
        });
    },

    deleteSubscriber: async (subscriberId: number): Promise<void> => {
        await prisma.subscriber.delete({
            where: {
                id: subscriberId
            }
        });
    },
};

export default SubscriberModel;
