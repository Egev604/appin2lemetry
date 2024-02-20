import express from 'express';
import { body } from 'express-validator';

import BodyValidationMiddleware from '../../common/middlewares/body.validator';
import UserController from '../controller/users.controller';
import UserMiddleware from '../middlewares/users.middlewares';

const userRoutes = express.Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();
const bodyValidationMiddleware = new BodyValidationMiddleware();
userRoutes.get('/', userController.listUsers);
userRoutes.post(
    '/',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Must include password (5+ characters)'),
    bodyValidationMiddleware.verifyBodyFieldsErrors,
    userMiddleware.validateEmailExist,
    userController.createUser,
);
userRoutes.put('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.deleteUser);

export default userRoutes;
