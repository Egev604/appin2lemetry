import express from 'express';

import AuthController from '../controllers/auth.controller';
import AuthMiddleware from '../middlewares/auth.middlewares';

const authMiddleware = new AuthMiddleware();
const authController = new AuthController();
const authRoutes = express.Router();

authRoutes.post('/', authMiddleware.verifyUserPassword, authController.login);
export default authRoutes;
