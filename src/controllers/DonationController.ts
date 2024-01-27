// controllers/DonationController.ts
import { Request, Response } from 'express';
import DonationModel from '../modals/DonationModel';
import { successResponse, errorResponse } from '../utils/response';

const DonationController: any = {
    getAllDonations: async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await DonationModel.getAllDonations();
            successResponse(res, 'Donations data fetched', {
                length: data.length,
                data: data
            });
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    getDonationById: async (req: Request, res: Response): Promise<void> => {
        try {
            const donationId = parseInt(req.params.id);
            const donation = await DonationModel.getDonationById(donationId);

            if (donation) {
                successResponse(res, 'Donation found', { data: donation });
            } else {
                errorResponse(res, 404, 'Donation not found');
            }
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    createDonation: async (req: Request, res: Response): Promise<void> => {
        try {
            const { paymentIntentId, donationAmount, donarName, donarPhone, donarEmail, donatedAt } = req.body;

            const newDonation: any = await DonationModel.createDonation({
                paymentIntentId,
                donationAmount,
                donarName,
                donarPhone,
                donarEmail,
                donatedAt
            });

            successResponse(res, 'Donation created successfully', { data: newDonation });
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    updateDonation: async (req: Request, res: Response): Promise<void> => {
        try {
            const donationId = parseInt(req.params.id);
            const updatedData: any = req.body;

            const updatedDonation: any = await DonationModel.updateDonation(donationId, updatedData);

            if (updatedDonation) {
                successResponse(res, 'Donation updated successfully', { data: updatedDonation });
            } else {
                errorResponse(res, 404, 'Donation not found');
            }
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    deleteDonation: async (req: Request, res: Response): Promise<void> => {
        try {
            const donationId = parseInt(req.params.id);

            await DonationModel.deleteDonation(donationId);

            successResponse(res, 'Donation deleted successfully');
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },
};

export default DonationController;
