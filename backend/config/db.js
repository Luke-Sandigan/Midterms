
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            // In Mongoose 7 the parser and topology options are defaults
        });
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};
