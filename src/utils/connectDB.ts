import mongoose from 'mongoose';
import config from 'config';

const dbUrl: string = config.get('dbUrl');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(dbUrl);
        console.log('Database Connected...');
    } catch (err: any) {
        console.log(err.message);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;