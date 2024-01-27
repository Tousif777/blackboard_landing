// controllers/SchoolController.ts
import { Request, Response } from 'express';
import SchoolModel from '../modals/SchoolModel';
import { successResponse, errorResponse } from '../utils/response';
import multer from 'multer';
import { uploadFile, deleteFile } from '../utils/uploader';
import { hashPassword } from '../utils/passwordUtils';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFileMiddleware = upload.single('file');

const SchoolController: any = {
    getAllSchools: async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await SchoolModel.getAllSchools();
            successResponse(res, 'Schools data fetched', {
                length: data.length,
                data: data
            });
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    getSchoolById: async (req: Request, res: Response): Promise<void> => {
        try {
            const schoolId = parseInt(req.params.id);
            const school = await SchoolModel.getSchoolById(schoolId);

            if (school) {
                successResponse(res, 'School found', { data: school });
            } else {
                errorResponse(res, 404, 'School not found');
            }
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    createSchool: async (req: Request, res: Response): Promise<void> => {
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

                const { schoolName, firstName, lastName, phoneNumber, message, address, city, country, email, password } = req.body;

                const file: Express.Multer.File | undefined = req.file;

                let fileUrl: any = '';
                if (file) {
                    fileUrl = await uploadFile(file, 'schools');
                }

                if (!password) {
                    errorResponse(res, 400, 'Password is required');
                    return;
                }

                const hashedPassword = await hashPassword(password);

                const newSchool: any = await SchoolModel.createSchool({
                    schoolName,
                    firstName,
                    lastName,
                    phoneNumber,
                    message,
                    address,
                    city,
                    country,
                    email,
                    password: hashedPassword,
                    file: fileUrl
                });

                successResponse(res, 'School created successfully', { data: newSchool });
            });
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    updateSchool: async (req: Request, res: Response): Promise<void> => {
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

                const schoolId = parseInt(req.params.id);
                const updatedData: any = req.body;

                const file: Express.Multer.File | undefined = req.file;

                try {
                    const school = await SchoolModel.getSchoolById(schoolId);

                    if (!school) {
                        errorResponse(res, 404, 'School not found');
                        return;
                    }

                    let fileUrl: any = '';
                    if (file) {
                        if (school.file) {
                            await deleteFile(school.file);
                        }
                        fileUrl = await uploadFile(file, 'school-profiles');
                        updatedData.file = fileUrl;
                    }

                    if (updatedData.password) {
                        const hashedPassword = await hashPassword(updatedData.password);
                        updatedData.password = hashedPassword;
                    }

                    const updatedSchool: any = await SchoolModel.updateSchool(schoolId, updatedData);

                    if (updatedSchool) {
                        successResponse(res, 'School updated successfully', { data: updatedSchool });
                    } else {
                        errorResponse(res, 404, 'School not found');
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

    deleteSchool: async (req: Request, res: Response): Promise<void> => {
        try {
            const schoolId = parseInt(req.params.id);

            const school = await SchoolModel.getSchoolById(schoolId);

            if (!school) {
                errorResponse(res, 404, 'School not found');
                return;
            }

            if (school.file) {
                await deleteFile(school.file);
            }

            await SchoolModel.deleteSchool(schoolId);

            successResponse(res, 'School deleted successfully');
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },
};

export default SchoolController;
