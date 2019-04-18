/* eslint max-len: 0 */
import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

import { hashPassword } from '../helpers/utils';
import { invalidPhoneNumberMsg } from '../helpers/defaults';

const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'phone number is required'],
        trim: true,
        unique: true,
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
            message: () => 'password length must be greater than 6'
        }
    }
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

ContactSchema.plugin(mongooseDelete, { deletedAt: true });

const User = mongoose.model('Contact', ContactSchema);

export default User;
