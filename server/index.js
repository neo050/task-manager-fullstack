
import express from 'express';
import dotenv  from 'dotenv';
import authRouter from './routes/auth.js';
import  cors  from 'cors';
dotenv.config();

const app  = express();

app.use(cors());
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use(express.json());
app.use('/auth', authRouter);

app.listen(3001, () => console.log('API listening on 3001'));
