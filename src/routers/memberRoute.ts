// routes/memberRoute.ts
import express, { Request, Response } from 'express';
import MemberController from '../controllers/MemberController';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    await MemberController.getAllMembers(req, res);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    await MemberController.getMemberById(req, res);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    await MemberController.createMember(req, res);
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    await MemberController.updateMember(req, res);
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    await MemberController.deleteMember(req, res);
});

export default router;
