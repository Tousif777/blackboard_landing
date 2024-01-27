// models/DonationModel.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PrismaDonation {
    donationId: number;
    paymentIntentId: string;
    donationAmount: number;
    donarName: string;
    donarPhone: string;
    donarEmail: string;
    donatedAt: Date;
}

interface DonationData {
    paymentIntentId: string;
    donationAmount: number;
    donarName: string;
    donarPhone: string;
    donarEmail: string;
    donatedAt: Date;
}

const DonationModel = {
    getAllDonations: async (): Promise<PrismaDonation[]> => {
        return prisma.donation.findMany({
            orderBy: {
                donatedAt: 'desc'
            }
        });
    },

    getDonationById: async (donationId: number): Promise<PrismaDonation | null> => {
        return prisma.donation.findUnique({
            where: {
                donationId: donationId
            }
        });
    },

    createDonation: async (donationData: DonationData): Promise<PrismaDonation> => {
        return prisma.donation.create({
            data: donationData
        });
    },

    updateDonation: async (donationId: number, updatedData: DonationData): Promise<PrismaDonation | null> => {
        return prisma.donation.update({
            where: {
                donationId: donationId
            },
            data: updatedData
        });
    },

    deleteDonation: async (donationId: number): Promise<void> => {
        await prisma.donation.delete({
            where: {
                donationId: donationId
            }
        });
    },
};

export default DonationModel;
