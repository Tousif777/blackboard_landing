// routes/donationRoute.ts
import express, { Request, Response } from 'express';
import DonationController from '../controllers/DonationController';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    await DonationController.getAllDonations(req, res);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    await DonationController.getDonationById(req, res);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    await DonationController.createDonation(req, res);
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    await DonationController.updateDonation(req, res);
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    await DonationController.deleteDonation(req, res);
});

export default router;
