import argon2 from 'argon2';
import { NextFunction, Request, Response } from 'express';

import User from '../../users/model/users.model';

class AuthMiddleware {
    verifyUserPassword = async (req: Request, res: Response, next: NextFunction) => {
        const userModel = new User();
        userModel.getUserByEmail(req.body.email, async (err, user) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (user) {
                user[0].password = await argon2.hash(user[0].password);
                if (await argon2.verify(user[0].password, req.body.password)) {
                    req.body = {
                        userId: user[0].userID,
                    };
                    return next();
                }
            }
            res.status(404).json({ error: 'Invalid email and/or password!' });
        });
    };
}

export default AuthMiddleware;
