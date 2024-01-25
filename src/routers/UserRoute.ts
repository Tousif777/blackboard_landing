// routes/userRoute.ts
import express, { Request, Response } from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    await UserController.getAllUsers(req, res);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    await UserController.getUserById(req, res);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    await UserController.createUser(req, res);
});

export default router;
