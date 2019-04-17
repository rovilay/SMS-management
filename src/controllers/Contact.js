import Contact from '../models/Contact';
import { comparePassword, generateToken } from '../helpers/utils';
import {
    defaultSuccessMsg, unavailablePhoneNumber, unavailableContact, invalidCredentials
} from '../helpers/defaults';

class ContactController {
    static async createContact(req, res, next) {
        try {
            const { name, phoneNumber, password } = req.body;
            const newContact = new Contact({
                name,
                password,
                phoneNumber
            });

            const findQuery = Contact.findOne({ phoneNumber });

            // check if phone number exist
            findQuery.exec(async (err, contact) => {
                if (err) return err;

                if (contact) {
                    return res.status(400).json({
                        success: true,
                        message: unavailablePhoneNumber,
                    });
                }
            });

            // create contact only if it doesn't exist
            const { err } = await newContact.save();

            if (err) throw err;

            const query = Contact.findOne({ phoneNumber });

            await query.exec(async (err, contact) => {
                if (err) throw err;

                const token = await generateToken(contact);

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

    static async loginContact(req, res, next) {
        try {
            const { phoneNumber, password } = req.body;
            const query = Contact.findOne({ phoneNumber, deleted: false });

            await query.exec(async (err, contact) => {
                if (err) return next(err);

                if (!contact) {
                    const error = {
                        message: unavailableContact,
                        status: 404
                    };

                    return next(error);
                }

                const { password: hashedPassword } = contact;
                const passwordMatch = await comparePassword(hashedPassword, password);

                if (!passwordMatch) {
                    const error = {
                        message: invalidCredentials,
                        status: 401
                    };

                    return next(error);
                }

                const token = await generateToken(contact);

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

    static getContact(req, res, next) {
        try {
            const { id } = req.params;
            const exclude = '-password -__v -deleted';
            Contact.findOne({ _id: id, deleted: false }, exclude).exec((err, contact) => {
                if (err) return next(err);

                if (!contact) {
                    const error = {
                        message: unavailableContact,
                        status: 404
                    };

                    return next(error);
                }

                return res.status(200).json({
                    success: true,
                    message: defaultSuccessMsg,
                    contact
                });
            });
        } catch (error) {
            return next(error);
        }
    }

    static async deleteContact(req, res, next) {
        try {
            const { _id } = req.contact;
            Contact.deleteById(_id, (err, _) => {
                if (err) return next(err);

                return res.status(200).json({
                    success: true,
                    message: defaultSuccessMsg,
                });
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default ContactController;
