// controllers/JobApplicationController.ts
import { Request, Response } from 'express';
import JobApplicationModel from '../modals/JobApplicationModel';
import { successResponse, errorResponse } from '../utils/response';
import multer from 'multer';
import { uploadFile, deleteFile } from '../utils/uploader';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFileMiddleware = upload.single('file');

const JobApplicationController: any = {
    getAllJobApplications: async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await JobApplicationModel.getAllJobApplications();
            successResponse(res, 'Job applications data fetched', {
                length: data.length,
                data: data
            });
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    getJobApplicationById: async (req: Request, res: Response): Promise<void> => {
        try {
            const applicationId = parseInt(req.params.id);
            const application = await JobApplicationModel.getJobApplicationById(applicationId);

            if (application) {
                successResponse(res, 'Job application found', { data: application });
            } else {
                errorResponse(res, 404, 'Job application not found');
            }
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    createJobApplication: async (req: Request, res: Response): Promise<void> => {
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

                const { firstName, lastName, address, city, country, phoneNumber, email } = req.body;

                const file: Express.Multer.File | undefined = req.file;

                let fileUrl: any = '';
                if (file) {
                    fileUrl = await uploadFile(file, 'job-applications');
                }

                const newJobApplication: any = await JobApplicationModel.createJobApplication({
                    firstName,
                    lastName,
                    address,
                    city,
                    country,
                    phoneNumber,
                    email,
                    file: fileUrl
                });

                successResponse(res, 'Job application created successfully', { data: newJobApplication });
            });
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    updateJobApplication: async (req: Request, res: Response): Promise<void> => {
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

                const applicationId = parseInt(req.params.id);
                const updatedData: any = req.body;

                const file: Express.Multer.File | undefined = req.file;

                try {
                    const application = await JobApplicationModel.getJobApplicationById(applicationId);

                    if (!application) {
                        errorResponse(res, 404, 'Job application not found');
                        return;
                    }

                    let fileUrl: any = '';
                    if (file) {
                        if (application.file) {
                            await deleteFile(application.file);
                        }
                        fileUrl = await uploadFile(file, 'job-application-profiles');
                        updatedData.file = fileUrl;
                    }

                    const updatedJobApplication: any = await JobApplicationModel.updateJobApplication(applicationId, updatedData);

                    if (updatedJobApplication) {
                        successResponse(res, 'Job application updated successfully', { data: updatedJobApplication });
                    } else {
                        errorResponse(res, 404, 'Job application not found');
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

    deleteJobApplication: async (req: Request, res: Response): Promise<void> => {
        try {
            const applicationId = parseInt(req.params.id);

            const application = await JobApplicationModel.getJobApplicationById(applicationId);

            if (!application) {
                errorResponse(res, 404, 'Job application not found');
                return;
            }

            if (application.file) {
                await deleteFile(application.file);
            }

            await JobApplicationModel.deleteJobApplication(applicationId);

            successResponse(res, 'Job application deleted successfully');
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },
};

export default JobApplicationController;
