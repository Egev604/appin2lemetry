import express from 'express';
import { body } from 'express-validator';

import BodyValidationMiddleware from '../../common/middlewares/body.validator';
import pcController from '../controller/pc.controller';
const bodyValidationMiddleware = new BodyValidationMiddleware();
const pcRoutes = express.Router();
pcRoutes.get('/', pcController.listPC);
pcRoutes.delete('/:id', pcController.deletePC);
pcRoutes.get('/:id', pcController.getPc);
pcRoutes.post(
    '/',
    body('Model').isString(),
    body('Description').isString(),
    body('Condition').isString(),
    body('components').optional().isObject(),
    bodyValidationMiddleware.verifyBodyFieldsErrors,
    pcController.createPC,
);
export default pcRoutes;
