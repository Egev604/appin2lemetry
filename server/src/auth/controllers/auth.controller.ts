import argon2 from 'argon2';
import { Request, Response } from 'express';

import JWTService from '../service/jwt.service';
class AuthController {
    login(req: Request, res: Response) {
        const jwtService = new JWTService();
        const token = jwtService.createJWT(req.body.userId);
        res.status(201).send({ token });
    }
    async signup(req: Request, res: Response) {
        req.body.password = await argon2.hash(req.body.password);

        res.status(201).send();
    }
}

export default AuthController;
