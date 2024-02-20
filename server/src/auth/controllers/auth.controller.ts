import argon2 from 'argon2';
import { Request, Response } from 'express';

import User from '../../users/model/users.model';
import JWTService from '../service/jwt.service';
const jwtService = new JWTService();
class AuthController {
    login(req: Request, res: Response) {
        const token = jwtService.createJWT(req.body.userId);
        res.status(201).send({ token });
    }
    async signup(req: Request, res: Response) {
        const userModel = new User();
        const hashedPassword = await argon2.hash(req.body.password);
        userModel.create(
            {
                email: req.body.email,
                password: hashedPassword,
                registrationDate: new Date().toISOString().split('T')[0],
            },
            (err, createdUser) => {
                console.log(createdUser);
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                if (!createdUser) {
                    res.status(500).json({ error: 'User creation failed' });
                    return;
                }
                const token = jwtService.createJWT(createdUser.userId);
                res.status(201).send({ token });
            },
        );
    }
}

export default AuthController;
