import jwt from 'jsonwebtoken';

import User from '../../users/model/users.model';
class JWTService {
    createJWT(id: number) {
        const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET || '', { expiresIn: '30m' });
        const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || '', { expiresIn: '1d' });
        return {
            accessToken,
            refreshToken,
        };
    }
    saveToken(token: string, userId: number) {
        const userModel = new User();
        userModel.saveToken(token, userId);
    }
    verifyJWT(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET || '');
    }
}
export default JWTService;
