require('dotenv').config();
import express, { Application, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import config from 'config';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import connectDB from './utils/connectDB';
import userRouter from './api/user/user.route';
import authRouter from './api/auth/auth.route';
import * as swaggerDocument from './swagger.json'

const app: Application = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
)

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cors(
    {
        origin: config.get<string>('origin'),
        credentials: true,
    }
));

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.get('/welcome', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to Auth API'
    })
});

// Routes not known
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
})

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
});

const port = config.get<number>('port');

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    connectDB();
});