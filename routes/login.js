import express from 'express';
import { findByUsername } from '../utils/db.js';
import bcrypt from 'bcryptjs'
import { signToken } from '../utils/jwt.js';

const router = express.Router()

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    let currentUser  = findByUsername(username)
    if (!currentUser) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, currentUser.passwordHash);
    if(match){
        const token = signToken({ id: currentUser.id, email: currentUser.username, role:currentUser.role });
        res.status(200).json({ message: "Login successful", token });
    }
    else{
        return res.status(401).json({ message: "Invalid credentials" })
    }
})

export default router;