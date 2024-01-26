// controllers/ContactController.ts
import { Request, Response } from 'express';
import ContactModel from '../modals/ContactModel';
import { successResponse, errorResponse } from '../utils/response';

// Contact controller
const ContactController: any = {
    getAllContacts: async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await ContactModel.getAllContacts();
            successResponse(res, 'Contact data fetched', {
                length: data.length,
                data: data
            });
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    getContactById: async (req: Request, res: Response): Promise<void> => {
        try {
            const contactId = parseInt(req.params.id);
            const contact = await ContactModel.getContactById(contactId);

            if (contact) {
                successResponse(res, 'Contact found', { data: contact });
            } else {
                errorResponse(res, 404, 'Contact not found');
            }
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    createContact: async (req: Request, res: Response): Promise<void> => {
        try {

            const { name, phoneNumber, email, subject, message } = req.body;

            const newContact: any = await ContactModel.createContact({
                name,
                phoneNumber,
                email,
                subject,
                message
            });

            successResponse(res, 'Contact created successfully', { data: newContact });
        
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    updateContact: async (req: Request, res: Response): Promise<void> => {
        try {

            const contactId = parseInt(req.params.id);
            const updatedData: any = req.body;

            const updatedContact: any = await ContactModel.updateContact(contactId, updatedData);

            if (updatedContact) {
                successResponse(res, 'Contact updated successfully', { data: updatedContact });
            } else {
                errorResponse(res, 404, 'Contact not found');
            }

        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    deleteContact: async (req: Request, res: Response): Promise<void> => {
        try {
            const contactId = parseInt(req.params.id);
            
            // Get the contact's data
            const contact = await ContactModel.getContactById(contactId);

            if (!contact) {
                errorResponse(res, 404, 'Contact not found');
                return;
            }

            // Delete the contact from the database
            await ContactModel.deleteContact(contactId);

            successResponse(res, 'Contact deleted successfully');
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },
};

export default ContactController;
