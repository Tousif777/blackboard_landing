// controllers/MemberController.ts
import { Request, Response } from 'express';
import MemberModel from '../modals/MemberModel';
import { successResponse, errorResponse } from '../utils/response';
import multer from 'multer';
import { uploadFile, deleteFile } from '../utils/uploader';
import { hashPassword } from '../utils/passwordUtils';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFileMiddleware = upload.single('file');

const MemberController: any = {
    getAllMembers: async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await MemberModel.getAllMembers();
            successResponse(res, 'Member data fetched', {
                length: data.length,
                data: data
            });
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    getMemberById: async (req: Request, res: Response): Promise<void> => {
        try {
            const memberId = parseInt(req.params.id);
            const member = await MemberModel.getMemberById(memberId);

            if (member) {
                successResponse(res, 'Member found', { data: member });
            } else {
                errorResponse(res, 404, 'Member not found');
            }
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    createMember: async (req: Request, res: Response): Promise<void> => {
        try {
            uploadFileMiddleware(req, res, async (err: any) => {
                if (err instanceof multer.MulterError) {
                    console.error(err);
                    errorResponse(res, 400, 'Multer Error');
                    return;
                } else if (err) {
                    console.error(err);
                    errorResponse(res, 500, 'Internal Server Error');
                    return;
                }

                const { stripeCustomerId, firstName, lastName, isSubscribed, address, city, country, phoneNumber, email, password } = req.body;

                const file: Express.Multer.File | undefined = req.file;

                let fileUrl: any = '';
                if (file) {
                    fileUrl = await uploadFile(file, 'members');
                }

                if (!password) {
                    errorResponse(res, 400, 'Password is required');
                    return;
                }

                const hashedPassword = await hashPassword(password);

                const newMember: any = await MemberModel.createMember({
                    stripeCustomerId,
                    firstName,
                    lastName,
                    isSubscribed,
                    address,
                    city,
                    country,
                    phoneNumber,
                    email,
                    password: hashedPassword,
                    file: fileUrl
                });

                successResponse(res, 'Member created successfully', { data: newMember });
            });
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    updateMember: async (req: Request, res: Response): Promise<void> => {
        try {
            uploadFileMiddleware(req, res, async (err: any) => {
                if (err instanceof multer.MulterError) {
                    console.error(err);
                    errorResponse(res, 400, 'Multer Error');
                    return;
                } else if (err) {
                    console.error(err);
                    errorResponse(res, 500, 'Internal Server Error');
                    return;
                }

                const memberId = parseInt(req.params.id);
                const updatedData: any = req.body;

                const file: Express.Multer.File | undefined = req.file;

                try {
                    const member = await MemberModel.getMemberById(memberId);

                    if (!member) {
                        errorResponse(res, 404, 'Member not found');
                        return;
                    }

                    let fileUrl: any = '';
                    if (file) {
                        if (member.file) {
                            await deleteFile(member.file);
                        }
                        fileUrl = await uploadFile(file, 'member-profiles');
                        updatedData.file = fileUrl;
                    }

                    if (updatedData.password) {
                        const hashedPassword = await hashPassword(updatedData.password);
                        updatedData.password = hashedPassword;
                    }

                    const updatedMember: any = await MemberModel.updateMember(memberId, updatedData);

                    if (updatedMember) {
                        successResponse(res, 'Member updated successfully', { data: updatedMember });
                    } else {
                        errorResponse(res, 404, 'Member not found');
                    }
                } catch (error) {
                    console.error(error);
                    errorResponse(res, 500, 'Internal Server Error');
                }
            });
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    deleteMember: async (req: Request, res: Response): Promise<void> => {
        try {
            const memberId = parseInt(req.params.id);

            const member = await MemberModel.getMemberById(memberId);

            if (!member) {
                errorResponse(res, 404, 'Member not found');
                return;
            }

            if (member.file) {
                await deleteFile(member.file);
            }

            await MemberModel.deleteMember(memberId);

            successResponse(res, 'Member deleted successfully');
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },
};

export default MemberController;
