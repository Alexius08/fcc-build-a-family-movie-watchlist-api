import { verifyToken } from '../utils/jwt.js'

export function authenticate(req, res, next){
    const authCode = req.headers.authorization
    if(!authCode || !authCode.startsWith("Bearer ")){
        return res.status(401).json({"error": "No token provided."})
    }
    else{
        const token = authCode.substring(authCode.indexOf(" ") + 1)
        try{
            const decoded = verifyToken(token)
            if(!decoded){
                return res.status(401).json({ "error": "Invalid or expired token." });
            }
            req.user = decoded;
            next();
        }
        catch(err){
            return res.status(401).json({ "error": "Invalid or expired token." });
        }
    }
}