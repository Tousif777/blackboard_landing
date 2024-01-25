// controllers/UserController.ts
import { Request, Response } from 'express';
import UserModel from '../modals/UserModel';
import { successResponse, errorResponse } from '../utils/response';

const UserController = {
    getAllUsers: async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await UserModel.getAllUsers();
            successResponse(res, 'User data fetched', {
                length: data.length,
                data: data
            });
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    getUserById: async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id);
            const user = await UserModel.getUserById(userId);

            if (user) {
                successResponse(res, 'User found', { data: user });
            } else {
                errorResponse(res, 404, 'User not found');
            }
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },

    createUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, email, password } = req.body;
            const newUser = await UserModel.createUser({
                username,
                email,
                password
            });

            successResponse(res, 'User created successfully', { data: newUser });
        } catch (error) {
            errorResponse(res, 500, 'Internal Server Error');
        }
    },
};

export default UserController;
