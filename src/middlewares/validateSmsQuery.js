import { validSmsStatus, mustBeNumber, smsTypeError } from '../helpers/defaults';

/**
 * Middleware the validates request queries on sms routes
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - next object
 * @returns {object} next object
 */
const validateSmsQuery = (req, res, next) => {
    try {
        const { limit, offset, type } = req.query;
        const errors = {};

        if (!offset && !limit && !type) {
            return next();
        }

        if (limit) {
            const modulo = limit % 1;
            if (modulo !== 0) {
                errors.limit = `limit ${mustBeNumber}`;
            } else {
                req.query.limit = parseInt(limit, 10);
            }
        }

        if (offset) {
            const modulo = offset % 1;
            if (modulo !== 0) {
                errors.offset = `offset ${mustBeNumber}`;
            } else {
                req.query.offset = parseInt(offset, 10);
            }
        }

        if (type) {
            const regexp = /^[a-zA-Z]+$/;
            const isAlpha = regexp.test(type);

            if (isAlpha && validSmsStatus.includes(type.toUpperCase())) {
                req.query.type = type.toUpperCase();
            } else {
                errors.type = smsTypeError;
            }
        }

        if (Object.keys(errors).length) {
            const error = { errors, status: 400 };
            throw error;
        }

        return next();
    } catch (error) {
        return next(error);
    }
};

export default validateSmsQuery;
