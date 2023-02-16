import { Request, Response, NextFunction } from 'express';
import { findAllUsers } from '../user/user.service';

export const getMeHandler = (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const getAllUsersHandler = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await findAllUsers();
        res.status(200).json({
            status: 'success',
            result: users.length,
            data: {
                users,
            }
        });
    } catch (err: any) {
        next(err);
    }
};