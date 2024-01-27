// routes/schoolRoute.ts
import express, { Request, Response } from 'express';
import SchoolController from '../controllers/SchoolController';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    await SchoolController.getAllSchools(req, res);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    await SchoolController.getSchoolById(req, res);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    await SchoolController.createSchool(req, res);
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    await SchoolController.updateSchool(req, res);
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    await SchoolController.deleteSchool(req, res);
});

export default router;
