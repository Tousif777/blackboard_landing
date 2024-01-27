// routes/studentRoute.ts
import express, { Request, Response } from 'express';
import StudentController from '../controllers/StudentController';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    await StudentController.getAllStudents(req, res);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    await StudentController.getStudentById(req, res);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    await StudentController.createStudent(req, res);
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    await StudentController.updateStudent(req, res);
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    await StudentController.deleteStudent(req, res);
});

export default router;
