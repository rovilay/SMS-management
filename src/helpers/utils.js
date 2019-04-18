import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET, TOKEN_EXPIRES_IN } = process.env;

/**
 * Hashes password
 *
 * @param {string} password - password to hash
 * @returns {string} hashed password
 */
export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

/**
 * Compares a password with a hashed password
 *
 * @param {*} hashedPassword
 * @param {*} password
 * @returns {boolean} true/false depending on if there is a match or not
 */
export const comparePassword = async (hashedPassword, password) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
};


/**
 * Generates user token using jsonwebtoken
 *
 * @param {object} user - user information to include in toke
 * @returns {string} token
 */
export const generateToken = async (user) => {
    try {
        const {
            _id, role, phoneNumber, name
        } = user;

        const token = await jwt.sign({
            _id, role, phoneNumber, name
        },
        SECRET, { expiresIn: TOKEN_EXPIRES_IN });
        return token;
    } catch (error) {
        throw error;
    }
};

/**
 * Verifies usertoken using jsonwebtoken
 *
 * @param {string} token - token to verify
 * @returns {object} user data
 */
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
