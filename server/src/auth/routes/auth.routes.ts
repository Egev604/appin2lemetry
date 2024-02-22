import express from 'express';
import { body } from 'express-validator';

import BodyValidationMiddleware from '../../common/middlewares/body.validator';
import UserMiddleware from '../../users/middlewares/users.middlewares';
import AuthController from '../controllers/auth.controller';
import AuthMiddleware from '../middlewares/auth.middlewares';

const authMiddleware = new AuthMiddleware();
const authController = new AuthController();
const bodyValidationMiddleware = new BodyValidationMiddleware();
const userMiddleware = new UserMiddleware();
const authRoutes = express.Router();

authRoutes.post(
    '/login',
    body('email').isEmail(),
    body('password').isString(),
    bodyValidationMiddleware.verifyBodyFieldsErrors,
    authMiddleware.verifyUserPassword,
    authController.login,
);
authRoutes.post(
    '/signup',
    body('email').isEmail(),
    body('password').isString(),
    bodyValidationMiddleware.verifyBodyFieldsErrors,
    userMiddleware.validateEmailExist,
    authController.signup,
);
authRoutes.post(
    '/access',
    body('accessToken').isString(),
    bodyValidationMiddleware.verifyBodyFieldsErrors,
    authController.access,
);
authRoutes.post(
    '/refresh',
    body('refreshToken').isString(),
    bodyValidationMiddleware.verifyBodyFieldsErrors,
    authController.refresh,
);
export default authRoutes;
