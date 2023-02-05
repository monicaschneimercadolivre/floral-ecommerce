
import { UserService } from '../services/user-service.js';

export const authMiddleware = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    console.log(authorization)
    const token = authorization ? authorization.split(" ")[1] : undefined;
    if (!token) {
        return res.status(401).json({ message: "Sem autorização, faça o login" })
    }

    const secretKey = process.env.SECRET_KEY;
    jwt.verify(token, secretKey, { ignoreExpiration: false }, async (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: "Aconteceu um erro ao logar no sistema" })
        }
        const isValidToken = decodedToken && decodedToken.user;
        if (!isValidToken) {
            res.status(401).json({ message: "Aconteceu um erro ao logar no sistema" })
        }
        const userService = new UserService();
        const user = await userService.findByEmail(decodedToken.user.email);
        if (user) {
            return next();
        }
    });
};