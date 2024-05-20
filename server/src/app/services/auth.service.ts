import JWT from 'jsonwebtoken';

export default class AuthService {
    private readonly secret: string;

    public constructor() {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.log('Missing jwt secret env variable');
            process.exit(1);
        }

        this.secret = secret;
    }

    public generateToken(userId: string): string {
        if (!userId) throw new Error('Missing user id');

        return JWT.sign({ id: userId }, this.secret);
    }

    public verifyToken(token: string): string | false {
        try {
            const payload = JWT.verify(token, this.secret) as { id: string, iat: number };
            if (!payload.id) return false;

            return payload.id;
        } catch (_) {
            return false;
        }
    }
}
