// routes/jobApplicationRoute.ts
import express, { Request, Response } from 'express';
import JobApplicationController from '../controllers/JobApplicationController';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    await JobApplicationController.getAllJobApplications(req, res);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    await JobApplicationController.getJobApplicationById(req, res);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    await JobApplicationController.createJobApplication(req, res);
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    await JobApplicationController.updateJobApplication(req, res);
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    await JobApplicationController.deleteJobApplication(req, res);
});

export default router;
