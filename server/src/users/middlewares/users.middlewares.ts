import argon2 from 'argon2';
import { NextFunction, Request, Response } from 'express';

import User from '../model/users.model';

class UserMiddleware {
    validateEmailExist(req: Request, res: Response, next: NextFunction) {
        const userModel = new User();
        console.log(req.body);
        userModel.getUserByEmail(req.body.email, async (err, user) => {
            console.log(user);
            if (user.length > 0) {
                res.status(400).send({ error: 'User email already exists!' });
            } else {
                next();
            }
        });
    }
}

export default UserMiddleware;
