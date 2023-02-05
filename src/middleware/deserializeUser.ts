import { Request, Response, NextFunction } from 'express';
import { findUserById } from '../api/user/user.service';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';
import { verifyJwt } from '../utils/jwt';

export const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let access_token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            access_token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }
        if (!access_token) {
            return next(new AppError('You are not logged in', 401));
        }
        // Validate access token
        const decoded = verifyJwt<{ sub: string }>(access_token);
        if (!decoded) {
            return next(new AppError('Invalid token or user does not exist', 401));
        }
        const { sub } = decoded;

        // Check if user has a valid session
        const session = await redisClient.get(sub);
        console.log(session)
        if (!session) {
            return next(new AppError('User session has expired', 401));
        }

        // Check if user still exists
        const user = await findUserById(JSON.parse(session)._id);
        if (!user) {
            return next(new AppError('User with token no longer exists', 401));
        }

        res.locals.user = user;
        next();
    } catch (err: any) {
        next(err);
    }
}