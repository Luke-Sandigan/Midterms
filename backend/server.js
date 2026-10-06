import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());


connectDB();


app.use('/api', router);

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
