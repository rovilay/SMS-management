/* eslint max-len: 0 */
import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate';

import { hashPassword } from '../helpers/utils';
import {
    invalidPhoneNumberMsg, passwordError, requiredPhoneNumber, requiredName,
    unavailablePhoneNumber
} from '../helpers/defaults';

const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: [true, requiredName],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, requiredPhoneNumber],
        trim: true,
        validate: {
            validator: (phoneNumber) => {
                const regex = /^[0][7-9][0-1]\d{8}$/;
                const valid = regex.test(phoneNumber);
                return valid;
            },
            message: () => invalidPhoneNumberMsg
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (password) => {
                let valid = false;

                if (password.length >= 7) {
                    valid = true;
                }

                return valid;
            },
            message: () => passwordError
        }
    }
}, {
    timestamps: true
});

ContactSchema.pre('save', async function () {
    try {
        if (this.password) {
            this.password = await hashPassword(this.password);
        }
    } catch (error) {
        throw new Error('hash error');
    }
});

ContactSchema.path('phoneNumber').validate(async (phoneNumber) => {
    const contact = await mongoose.models.Contact.findOne({ phoneNumber });
    return !contact;
}, unavailablePhoneNumber);

ContactSchema.plugin(mongooseDelete, { deletedAt: true });
ContactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
