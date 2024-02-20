import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';

import authRoutes from '../auth/routes/auth.routes';
import userRoutes from '../users/routes/users.routes';

const app: Express = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.get('/test', (req: Request, res: Response) => {
    res.status(200).send(JSON.stringify({ data: 'AAAA!' }));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
