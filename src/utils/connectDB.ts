import mongoose from 'mongoose';
import config from 'config';

const dbUrl = `mongodb+srv://${config.get('dbName')}:${config.get('dbPass')}@cluster0.icnqhci.mongodb.net/typescript-auth-api?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(dbUrl);
        console.log('Database Connected...');
    } catch (err: any) {
        console.log(err.message);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;