// controllers/SubscriberController.ts
import { Request, Response } from 'express';
import SubscriberModel from '../modals/SubscriberModel';
import { successResponse, errorResponse } from '../utils/response';

const SubscriberController: any = {
    getAllSubscribers: async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await SubscriberModel.getAllSubscribers();
            successResponse(res, 'Subscribers data fetched', {
                length: data.length,
                data: data
            });
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    getSubscriberById: async (req: Request, res: Response): Promise<void> => {
        try {
            const subscriberId = parseInt(req.params.id);
            const subscriber = await SubscriberModel.getSubscriberById(subscriberId);

            if (subscriber) {
                successResponse(res, 'Subscriber found', { data: subscriber });
            } else {
                errorResponse(res, 404, 'Subscriber not found');
            }
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    createSubscriber: async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, subscribedAt } = req.body;

            const newSubscriber: any = await SubscriberModel.createSubscriber({
                email,
                subscribedAt
            });

            successResponse(res, 'Subscriber created successfully', { data: newSubscriber });
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    updateSubscriber: async (req: Request, res: Response): Promise<void> => {
        try {
            const subscriberId = parseInt(req.params.id);
            const updatedData: any = req.body;

            const updatedSubscriber: any = await SubscriberModel.updateSubscriber(subscriberId, updatedData);

            if (updatedSubscriber) {
                successResponse(res, 'Subscriber updated successfully', { data: updatedSubscriber });
            } else {
                errorResponse(res, 404, 'Subscriber not found');
            }
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    deleteSubscriber: async (req: Request, res: Response): Promise<void> => {
        try {
            const subscriberId = parseInt(req.params.id);

            await SubscriberModel.deleteSubscriber(subscriberId);

            successResponse(res, 'Subscriber deleted successfully');
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },
};

export default SubscriberController;
