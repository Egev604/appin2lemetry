import jwt from 'jsonwebtoken';
class JWTService {
    createJWT(id: number) {
        return jwt.sign({ id }, process.env.JWT_SECRET || '', {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    }

    verifyJWT(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET || '');
    }
}
export default JWTService;
