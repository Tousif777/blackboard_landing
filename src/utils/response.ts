import { Response } from 'express';

export const successResponse = (res: Response, message: string, data?: any): void => {
    if (data) {
        res.json({
            error: false,
            status: 200,
            message: message,
            data: data
        });
    } else {
        res.json({
            error: false,
            status: 200,
            message: message,
        });
    }
};

export const errorResponse = (res: Response, status: number, message: string): void => {
    res.status(status).json({
        error: true,
        status: status,
        message: message,
    });
};
