import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

export const comparePassword = async (hashedPassword, password) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
};


export const generateToken = async (user) => {
    try {
        const {
            _id, role, phoneNumber, name
        } = user;

        const token = await jwt.sign({
            _id, role, phoneNumber, name
        },
        process.env.SECRET, { expiresIn: '24h' });
        return token;
    } catch (error) {
        throw error;
    }
};

export const verifyToken = (token) => {
    if (token) {
        jwt.verify(token, process.env.SECRET, (error, userData) => {
            if (error || userData === undefined) {
                throw new Error('error verifying token');
            }

            return userData;
        });
    }
};
