import { Request, Response } from 'express';

import JWTService from '../service/jwt.service';
class AuthController {
    login(req: Request, res: Response) {
        const jwtService = new JWTService();
        const token = jwtService.createJWT(req.body.userId);
        res.status(201).send({ token });
    }
}

export default AuthController;
