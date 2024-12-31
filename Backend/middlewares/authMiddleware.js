import jwt from 'jsonwebtoken';

const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};

export default requireSignIn;