/* eslint no-unused-vars: 0 */

/**
 * Middleware that Handles errors
 *
 * @param {object} error - error object
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - next object
 * @returns {object} response object
 */
const errorHandler = (error, req, res, next) => {
    const { message, errors } = error;

    res.status(error.status || 500).json({
        success: false,
        error: message || errors
    });
};

export default errorHandler;
