// routes/contactRoute.ts
import express, { Request, Response } from 'express';
import ContactController from '../controllers/ContactController';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    await ContactController.getAllContacts(req, res);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    await ContactController.getContactById(req, res);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    await ContactController.createContact(req, res);
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    await ContactController.updateContact(req, res);
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    await ContactController.deleteContact(req, res);
});

export default router;
