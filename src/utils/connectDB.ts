import mongoose from 'mongoose';
import config from 'config';

const dbUrl = `mongodb://${config.get('dbName')}:${config.get('dbPass')}@localhost:6000/typescript-auth-api?authSource=asmin`;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log('Database Connected...');
    } catch (err: any) {
        console.log(err.message);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;