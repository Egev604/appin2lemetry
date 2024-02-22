import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

class BodyValidationMiddleware {
    verifyBodyFieldsErrors(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                errors: errors.array(),
            });
        }
        next();
    }
}

export default BodyValidationMiddleware;
