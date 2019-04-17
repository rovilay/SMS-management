import User from '../models/User';
import { comparePassword, generateToken } from '../helpers/utils';
import { defaultSuccessMsg } from '../helpers/defaults';

class UserController {
    static async createUser(req, res, next) {
        try {
            const { name, phoneNumber, password } = req.body;
            const newUser = new User({
                name,
                password,
                phoneNumber
            });

            const { err } = await newUser.save();

            if (err) throw err;

            const query = User.findOne({ phoneNumber });

            query.exec(async (err, user) => {
                if (err) throw err;

                const token = await generateToken(user);

                return res.status(201).json({
                    success: true,
                    message: defaultSuccessMsg,
                    token
                });
            });
        } catch (error) {
            return next(error);
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { phoneNumber, password } = req.body;
            const query = User.findOne({ phoneNumber });

            query.exec(async (err, user) => {
                if (err) return next(err);

                if (!user) {
                    const error = {
                        message: 'user does not exist',
                        status: 404
                    };

                    return next(error);
                }

                const { password: hashedPassword } = user;
                const passwordMatch = await comparePassword(hashedPassword, password);

                if (!passwordMatch) {
                    const error = {
                        message: 'invalid credentials',
                        status: 401
                    };

                    return next(error);
                }

                const token = await generateToken(user);

                return res.status(200).json({
                    success: true,
                    message: defaultSuccessMsg,
                    token
                });
            });
        } catch (error) {
            return next(error);
        }
    }

    static getUser(req, res, next) {
        try {
            const { id } = req.params;
            const exclude = '-password -__v';
            User.findById(id, exclude).exec((err, user) => {
                if (err) return next(err);

                if (!user) {
                    const error = {
                        message: 'user does not exist',
                        status: 404
                    };

                    return next(error);
                }

                return res.status(200).json({
                    success: true,
                    message: defaultSuccessMsg,
                    user
                });
            });
        } catch (error) {
            return next(error);
        }
    }

    static getAllUsers(req, res, next) {
        try {
            const exclude = '-password -__v';
            User.find({}, exclude).exec((err, users) => {
                if (err) return next(err);

                if (!users.length) {
                    const error = {
                        message: 'no user found',
                        status: 404
                    };

                    return next(error);
                }

                return res.status(200).json({
                    success: true,
                    message: defaultSuccessMsg,
                    users
                });
            });
        } catch (error) {
            return next(error);
        }
    }

    static updateUserRole(req, res, next) {
        try {
            const { id } = req.params;
            const { role } = req.body;
            if (!role) {
                const error = {
                    message: 'role is required',
                    status: 400
                };

                throw error;
            }
            const include = 'name _id phoneNumber role';

            const options = {
                new: true,
                select: include,
                runValidators: true
            };

            const query = User.findOneAndUpdate({ _id: id }, { role }, options);
            query.exec((err, user) => {
                if (err) return next(err);

                if (!user) {
                    const error = {
                        message: 'no user found',
                        status: 404
                    };

                    return next(error);
                }

                return res.status(200).json({
                    success: true,
                    message: defaultSuccessMsg,
                    user
                });
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default UserController;
