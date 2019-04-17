import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
    genericErrorMessage, invalidToken, tokenRequired
} from '../helpers/defaults';
import Contact from '../models/Contact';

dotenv.config();

const { SECRET } = process.env;
export const authenticate = async (req, res, next) => {
    try {
        const { authorization: bearerToken } = req.headers;

        if (!bearerToken || bearerToken.split(' ')[0] !== 'Bearer') {
            const error = {
                message: tokenRequired,
                status: 401
            };

            throw error;
        }

        const token = bearerToken.split(' ')[1];
        // verify token
        jwt.verify(token, SECRET, (err, userData) => {
            if (err || userData === undefined) {
                err.message = genericErrorMessage;
                return next(err);
            }
            const { _id } = userData;

            Contact.findOne({ _id, deleted: false })
                .exec((err, contact) => {
                    if (err || !contact) {
                        const error = {
                            message: invalidToken,
                            status: 401
                        };

                        return next(error);
                    }

                    const {
                        _id: id, name, role, phoneNumber
                    } = contact;
                    req.contact = {
                        _id: id, name, role, phoneNumber
                    };
                    return next();
                });
        });
    } catch (error) {
        return next(error);
    }
};

export default authenticate;
