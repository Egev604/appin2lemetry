import express from 'express';
import { body } from 'express-validator';

import BodyValidationMiddleware from '../../common/middlewares/body.validator';
import pcController from '../controller/pc.controller';
import PcMiddlewares from '../middlewares/pc.middlewares';
const bodyValidationMiddleware = new BodyValidationMiddleware();
const pcRoutes = express.Router();
pcRoutes.get('/', pcController.listPC);
pcRoutes.delete('/:id', PcMiddlewares.validatePcExists, pcController.deletePC);
pcRoutes.get('/:id', PcMiddlewares.validatePcExists, pcController.getPc);
pcRoutes.put(
    '/:id',
    body('ComputerID').isNumeric(),
    body('Model').isString(),
    body('Description').isString(),
    body('Condition').isString(),
    body('components').optional().isObject(),
    bodyValidationMiddleware.verifyBodyFieldsErrors,
    PcMiddlewares.validatePcExists,
    pcController.updatePC,
);
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
