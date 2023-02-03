export default class AppError extends Error {
    status: string;
    isOperational: boolean;
    contructor: Function | undefined;

    constructor(public message: string, public statusCode: number=500) {
        super(message);
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.contructor);
    }
}