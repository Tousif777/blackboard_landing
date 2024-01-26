// routes/teacherRoute.ts
import express, { Request, Response } from 'express';
import TeacherController from '../controllers/TeacherController';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    await TeacherController.getAllTeachers(req, res);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    await TeacherController.getTeacherById(req, res);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    await TeacherController.createTeacher(req, res);
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    await TeacherController.updateTeacher(req, res);
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    await TeacherController.deleteTeacher(req, res);
});

export default router;
