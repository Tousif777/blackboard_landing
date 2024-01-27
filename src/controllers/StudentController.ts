// controllers/StudentController.ts
import { Request, Response } from 'express';
import StudentModel from '../modals/StudentModel';
import { successResponse, errorResponse } from '../utils/response';
import multer from 'multer';
import { uploadFile, deleteFile } from '../utils/uploader';
import { hashPassword } from '../utils/passwordUtils';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFileMiddleware = upload.single('file');

const StudentController: any = {
    getAllStudents: async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await StudentModel.getAllStudents();
            successResponse(res, 'Student data fetched', {
                length: data.length,
                data: data
            });
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    getStudentById: async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = parseInt(req.params.id);
            const student = await StudentModel.getStudentById(studentId);

            if (student) {
                successResponse(res, 'Student found', { data: student });
            } else {
                errorResponse(res, 404, 'Student not found');
            }
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    createStudent: async (req: Request, res: Response): Promise<void> => {
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

                const { firstName, lastName, address, city, country, phoneNumber, email, schoolName, grade, password } = req.body;

                const file: Express.Multer.File | undefined = req.file;

                let fileUrl: any = '';
                if (file) {
                    fileUrl = await uploadFile(file, 'students');
                }

                if (!password) {
                    errorResponse(res, 400, 'Password is required');
                    return;
                }

                const hashedPassword = await hashPassword(password);

                const newStudent: any = await StudentModel.createStudent({
                    firstName,
                    lastName,
                    address,
                    city,
                    country,
                    phoneNumber,
                    email,
                    schoolName,
                    grade,
                    password: hashedPassword,
                    file: fileUrl
                });

                successResponse(res, 'Student created successfully', { data: newStudent });
            });
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    updateStudent: async (req: Request, res: Response): Promise<void> => {
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

                const studentId = parseInt(req.params.id);
                const updatedData: any = req.body;

                const file: Express.Multer.File | undefined = req.file;

                try {
                    const student = await StudentModel.getStudentById(studentId);

                    if (!student) {
                        errorResponse(res, 404, 'Student not found');
                        return;
                    }

                    let fileUrl: any = '';
                    if (file) {
                        if (student.file) {
                            await deleteFile(student.file);
                        }
                        fileUrl = await uploadFile(file, 'student-profiles');
                        updatedData.file = fileUrl;
                    }

                    if (updatedData.password) {
                        const hashedPassword = await hashPassword(updatedData.password);
                        updatedData.password = hashedPassword;
                    }

                    const updatedStudent: any = await StudentModel.updateStudent(studentId, updatedData);

                    if (updatedStudent) {
                        successResponse(res, 'Student updated successfully', { data: updatedStudent });
                    } else {
                        errorResponse(res, 404, 'Student not found');
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

    deleteStudent: async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = parseInt(req.params.id);

            const student = await StudentModel.getStudentById(studentId);

            if (!student) {
                errorResponse(res, 404, 'Student not found');
                return;
            }

            if (student.file) {
                await deleteFile(student.file);
            }

            await StudentModel.deleteStudent(studentId);

            successResponse(res, 'Student deleted successfully');
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error');
        }
    },
};

export default StudentController;
