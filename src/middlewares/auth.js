import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { genericErrorMessage, unAuthorizedMessage } from '../helpers/defaults';
import User from '../models/User';

dotenv.config();

const { SECRET } = process.env;
export const authenticate = async (req, res, next) => {
    try {
        const { authorization: bearerToken } = req.headers;

        if (!bearerToken || bearerToken.split(' ')[0] !== 'Bearer') {
            const error = {
                message: 'Token is required',
                status: 401
            };

            throw error;
        }

        const token = bearerToken.split(' ')[1];
        // verify token
        jwt.verify(token, SECRET, (err, userData) => {
            if (err || userData === undefined) {
                err.status = 401;
                err.message = genericErrorMessage;
                return next(err);
            }
            const { _id } = userData;

            User.findById(_id)
                .exec((err, user) => {
                    if (err || !user) {
                        const error = {
                            message: 'user does not exist',
                            status: 404
                        };

                        return next(error);
                    }

                    const {
                        _id: id, name, role, phoneNumber
                    } = user;
                    req.user = {
                        _id: id, name, role, phoneNumber
                    };
                    return next();
                });
        });
    } catch (error) {
        return next(error);
    }
};

export const verifyUserRole = (user, roles) => {
    let valid = false;
    const { role } = user;
    valid = roles.includes(role);

    return valid;
};

export const authorize = roles => async (req, res, next) => {
    try {
        const { user } = req;
        const valid = await verifyUserRole(user, roles);

        if (valid) return next();

        const error = {
            message: unAuthorizedMessage,
            status: 403
        };

        return next(error);
    } catch (error) {
        return next(error);
    }
};
