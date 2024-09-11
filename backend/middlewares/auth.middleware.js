import jwt from "jsonwebtoken"
export const authenticateUser = (req, res, next) => {
    //   const token = req.headers['authorization'];
    // agar logged in ho toh req.cookies.token ka access milta hai
    const token = req?.cookies?.token
    console.log('auth middleware token\n', token)

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token is not valid' });
        // console.log("decoded\n" , decoded)
        
        req.username = decoded.username 
        next();
    });
};