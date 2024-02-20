import express from 'express';
import { body } from 'express-validator';

import BodyValidationMiddleware from '../../common/middlewares/body.validator';
import AuthController from '../controllers/auth.controller';
import AuthMiddleware from '../middlewares/auth.middlewares';

const authMiddleware = new AuthMiddleware();
const authController = new AuthController();
const bodyValidationMiddleware = new BodyValidationMiddleware();
const authRoutes = express.Router();

authRoutes.post(
    '/',
    body('email').isEmail,
    body('password').isString(),
    bodyValidationMiddleware.verifyBodyFieldsErrors,
    authMiddleware.verifyUserPassword,
    authController.login,
);
export default authRoutes;
