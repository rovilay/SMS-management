import SMS from '../models/Sms';
import Contact from '../models/Contact';
import DB from '../helpers/db';
import {
    unavailableContact, defaultSuccessMsg, personalSmsErrorMsg,
    unAuthroizedMessageV2, defaultPaginationLimit, defaultPaginationOffset,
    smsNotFoundMsg, validSmsStatus
} from '../helpers/defaults';

/**
 * Handles operations on sms routes
 *
 * @exports
 * @class SmsController
 */
class SmsController {
    /**
     * Creates Sms
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof SmsController
     */
    static async createSms(req, res, next) {
        try {
            const { message } = req.body;
            const { phoneNumber: receiver } = req.params;
            const { phoneNumber: sender } = req.contact;

            if (sender === receiver) {
                const error = {
                    message: personalSmsErrorMsg,
                    status: 400
                };

                throw error;
            }

            let conditions = { phoneNumber: receiver };
            const receiverContact = await DB.findOne(Contact, conditions);

            if (!receiverContact) {
                const error = {
                    message: unavailableContact,
                    status: 404
                };

                throw error;
            }

            conditions = { receiver, sender, message };
            const newSms = await DB.create(SMS, conditions);

            if (newSms) {
                return res.status(201).json({
                    success: true,
                    message: defaultSuccessMsg,
                    sms: {
                        _id: newSms._id,
                        sender: newSms.sender,
                        receiver: newSms.receiver,
                        message: newSms.message,
                        status: newSms.status,
                        createdAt: newSms.createdAt,
                        updatedAt: newSms.updatedAt,
                    }
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    /**
     * Gets Sms
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof SmsController
     */
    static async getSms(req, res, next) {
        try {
            const { phoneNumber } = req.contact;
            const { limit, offset, type } = req.query;
            let conditions = {
                $or: [
                    { sender: phoneNumber, },
                    { receiver: phoneNumber }
                ],
            };

            if (type === validSmsStatus[0]) {
                conditions = { sender: phoneNumber };
            }

            if (type === validSmsStatus[1]) {
                conditions = { receiver: phoneNumber, status: type };
            }

            const options = {
                limit: limit || defaultPaginationLimit,
                offset: offset || defaultPaginationOffset,
                select: '_id message sender receiver status createdAt updatedAt',
                sort: { updatedAt: -1 }
            };

            const sms = await DB.findAll(SMS, conditions, options);

            if (!sms.docs.length) {
                const error = {
                    message: smsNotFoundMsg,
                    status: 404
                };

                throw error;
            }

            return res.status(200).json({
                success: true,
                message: defaultSuccessMsg,
                sms: sms.docs,
                offset: sms.offset,
                limit: sms.limit,
                total: sms.total
            });
        } catch (error) {
            return next(error);
        }
    }

    /**
     * Updates sms status
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof SmsController
     */
    static async updateSmsStatus(req, res, next) {
        try {
            const { status: newStatus } = req.body;
            const { phoneNumber } = req.contact;
            const { smsId } = req.params;

            const conditions = {
                _id: smsId,
                receiver: phoneNumber,
                status: validSmsStatus[0]
            };
            const data = { status: newStatus };
            const options = {
                new: true,
                fields: '_id message sender receiver status createdAt updatedAt'
            };

            const updatedSms = await DB.updateOne(SMS, conditions, data, options);
            if (!updatedSms) {
                const error = {
                    message: `either ${smsNotFoundMsg} or ${unAuthroizedMessageV2}`,
                    status: 400
                };

                throw error;
            }

            return res.status(200).json({
                success: true,
                message: defaultSuccessMsg,
                sms: updatedSms
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default SmsController;
