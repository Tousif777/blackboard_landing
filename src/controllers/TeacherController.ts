// controllers/TeacherController.ts
import { Request, Response } from 'express';
import TeacherModel from '../modals/TeacherModel';
import { successResponse, errorResponse } from '../utils/response';
import multer from 'multer';
import { uploadFile, deleteFile } from '../utils/uploader';
import { hashPassword } from '../utils/passwordUtils';

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define multer middleware
const uploadFileMiddleware = upload.single('file');

// Teacher controller
const TeacherController: any = {
    getAllTeachers: async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await TeacherModel.getAllTeachers();
            successResponse(res, 'Teacher data fetched', {
                length: data.length,
                data: data
            });
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    getTeacherById: async (req: Request, res: Response): Promise<void> => {
        try {
            const teacherId = parseInt(req.params.id);
            const teacher = await TeacherModel.getTeacherById(teacherId);

            if (teacher) {
                successResponse(res, 'Teacher found', { data: teacher });
            } else {
                errorResponse(res, 404, 'Teacher not found');
            }
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    createTeacher: async (req: Request, res: Response): Promise<void> => {
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

                const { firstName, lastName, address, city, country, phoneNumber, email, password } = req.body;

                // Access the file from the request object
                const file: Express.Multer.File | undefined = req.file;

                // Handle file upload if it exists in the request
                let fileUrl: any = '';
                if (file) {
                    // Handle file upload logic here (use your uploadFile function)
                    fileUrl = await uploadFile(file, 'teachers');
                }

                // Ensure password is provided and handle password logic as needed
                if (!password) {
                    errorResponse(res, 400, 'Password is required');
                    return;
                }

                // Use the hashPassword function to securely hash the password
                const hashedPassword = await hashPassword(password);

                const newTeacher: any = await TeacherModel.createTeacher({
                    firstName,
                    lastName,
                    address,
                    city,
                    country,
                    phoneNumber,
                    email,
                    password: hashedPassword, // Save the hashed password
                    file: fileUrl
                });

                successResponse(res, 'Teacher created successfully', { data: newTeacher });
            });
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    updateTeacher: async (req: Request, res: Response): Promise<void> => {
        try {
            // Use multer middleware to handle file upload
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

                const teacherId = parseInt(req.params.id);
                const updatedData: any = req.body;

                // Access the file from the request object
                const file: Express.Multer.File | undefined = req.file;

                try {
                    // Get the current data of the teacher
                    const teacher = await TeacherModel.getTeacherById(teacherId);

                    // Check if the teacher exists
                    if (!teacher) {
                        errorResponse(res, 404, 'Teacher not found');
                        return;
                    }

                    // Handle file upload if it exists in the request
                    let fileUrl: any = '';
                    if (file) {
                        // Delete the existing file from AWS S3 if there is one
                        if (teacher.file) {
                            await deleteFile(teacher.file);
                        }

                        // Handle file upload logic here (use your uploadFile function)
                        fileUrl = await uploadFile(file, 'teacher-profiles');
                        updatedData.file = fileUrl; // Update the file URL in the update data
                    }

                    // Check if the password is provided in the update data
                    if (updatedData.password) {
                        // Use the hashPassword function to securely hash the password
                        const hashedPassword = await hashPassword(updatedData.password);
                        updatedData.password = hashedPassword; // Update the hashed password in the update data
                    }

                    // Update the teacher in the database
                    const updatedTeacher: any = await TeacherModel.updateTeacher(teacherId, updatedData);

                    if (updatedTeacher) {
                        successResponse(res, 'Teacher updated successfully', { data: updatedTeacher });
                    } else {
                        errorResponse(res, 404, 'Teacher not found');
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

    deleteTeacher: async (req: Request, res: Response): Promise<void> => {
        try {
            const teacherId = parseInt(req.params.id);

            // Get the teacher's data
            const teacher = await TeacherModel.getTeacherById(teacherId);

            if (!teacher) {
                errorResponse(res, 404, 'Teacher not found');
                return;
            }

            // Delete the associated file, if any
            if (teacher.file) {
                await deleteFile(teacher.file);
            }

            // Delete the teacher from the database
            await TeacherModel.deleteTeacher(teacherId);

            successResponse(res, 'Teacher deleted successfully');
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },
};

export default TeacherController;
