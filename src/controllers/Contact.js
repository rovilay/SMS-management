import Contact from '../models/Contact';
import SMS from '../models/Sms';
import DB from '../helpers/db';
import { comparePassword, generateToken } from '../helpers/utils';
import {
    defaultSuccessMsg, unavailableContact, invalidCredentials
} from '../helpers/defaults';

class ContactController {
    static async createContact(req, res, next) {
        try {
            const { name, phoneNumber, password } = req.body;
            const conditions = {
                name,
                password,
                phoneNumber
            };
            const newContact = await DB.create(Contact, conditions);

            if (newContact) {
                const token = await generateToken(newContact);

                return res.status(201).json({
                    success: true,
                    message: defaultSuccessMsg,
                    token
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async loginContact(req, res, next) {
        try {
            const { phoneNumber, password } = req.body;
            const conditions = { phoneNumber, deleted: false };
            const contact = await DB.findOne(Contact, conditions);

            if (!contact) {
                const error = {
                    message: unavailableContact,
                    status: 404
                };

                throw error;
            }

            const { password: hashedPassword } = contact;
            const passwordMatch = await comparePassword(hashedPassword, `${password}`);

            if (!passwordMatch) {
                const error = {
                    message: invalidCredentials,
                    status: 401
                };

                throw error;
            }

            const token = await generateToken(contact);

            return res.status(200).json({
                success: true,
                message: defaultSuccessMsg,
                token
            });
        } catch (error) {
            return next(error);
        }
    }

    static async getContact(req, res, next) {
        try {
            const { id } = req.params;
            const exclude = '-password -__v -deleted';
            const conditions = { _id: id, deleted: false };
            const contact = await DB.findOne(Contact, conditions, exclude);

            if (!contact) {
                const error = {
                    message: unavailableContact,
                    status: 404
                };

                throw error;
            }

            return res.status(200).json({
                success: true,
                message: defaultSuccessMsg,
                contact
            });
        } catch (error) {
            return next(error);
        }
    }

    static async deleteContact(req, res, next) {
        try {
            const { _id, phoneNumber } = req.contact;
            const conditions = { _id, delete: false };
            const smsCondtions = {
                $or: [
                    { sender: phoneNumber },
                    { receiver: phoneNumber }
                ]
            };

            await DB.deleteById(Contact, conditions);
            await DB.deleteAll(SMS, smsCondtions);

            return res.status(200).json({
                success: true,
                message: defaultSuccessMsg,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default ContactController;
