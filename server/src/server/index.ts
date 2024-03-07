import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

import authRoutes from '../auth/routes/auth.routes';
import pcRoutes from '../pc/routes/pc.routes';
import userRoutes from '../users/routes/users.routes';

const app: Express = express();
dotenv.config();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }),
);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/pc', pcRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
