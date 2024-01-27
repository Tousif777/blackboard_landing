// routes/subscriberRoute.ts
import express, { Request, Response } from 'express';
import SubscriberController from '../controllers/SubscriberController';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    await SubscriberController.getAllSubscribers(req, res);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    await SubscriberController.getSubscriberById(req, res);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    await SubscriberController.createSubscriber(req, res);
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    await SubscriberController.updateSubscriber(req, res);
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    await SubscriberController.deleteSubscriber(req, res);
});

export default router;
