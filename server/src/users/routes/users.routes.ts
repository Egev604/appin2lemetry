import express from 'express';

import UserController from '../controller/users.controller';

const userRoutes = express.Router();

userRoutes.get('/', UserController.listUsers);
userRoutes.post('/', UserController.createUser);
userRoutes.put('/:id', UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);

export default userRoutes;
