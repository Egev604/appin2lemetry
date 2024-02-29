import argon2 from 'argon2';
import { Request, Response } from 'express';

import User from '../../users/model/users.model';
import JWTService from '../service/jwt.service';
const jwtService = new JWTService();
class AuthController {
    login(req: Request, res: Response) {
        const { accessToken, refreshToken } = jwtService.createJWT(req.body.userId);
        jwtService.saveToken(refreshToken, req.body.userId);
        res.status(201).json({ token: { accessToken, refreshToken } });
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
                const { accessToken, refreshToken } = jwtService.createJWT(createdUser.userId);
                jwtService.saveToken(refreshToken, createdUser.userId);
                res.status(201).json({ token: { accessToken, refreshToken } });
            },
        );
    }
    refresh(req: Request, res: Response) {
        const userData = jwtService.validateRefreshToken(req.body.refreshToken);
        const userModel = new User();
        userModel.findToken(req.body.refreshToken, (err, user) => {
            console.log(userData, user);
            if (!userData || !user.refreshToken) {
                res.status(401).json('Invalid refresh token');
            } else {
                const { accessToken, refreshToken } = jwtService.createJWT(user.userId);
                jwtService.saveToken(refreshToken, user.userId);
                res.status(201).json({ accessToken, refreshToken });
            }
        });
    }
    access(req: Request, res: Response) {
        const userData = jwtService.validateAccessToken(req.body.accessToken);
        if (!userData || typeof userData === 'string') {
            res.status(401).json('Invalid access token');
        } else {
            const userId = userData.id;
            const { accessToken, refreshToken } = jwtService.createJWT(userId);
            jwtService.saveToken(refreshToken, userId);
            res.status(201).json({ accessToken, refreshToken });
        }
    }
}

export default AuthController;
