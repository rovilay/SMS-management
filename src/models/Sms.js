/* eslint max-len: 0 */
import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import {
    invalidPhoneNumberMsg, requiredPhoneNumber, isRequired,
    validSmsStatus
} from '../helpers/defaults';

const SmsSchema = new Schema({
    sender: {
        type: String,
        trim: true,
        validate: {
            validator: (phoneNumber) => {
                const regex = /^[0][7-9][0-1]\d{8}$/;
                const valid = regex.test(phoneNumber);
                return valid;
            },
            message: () => invalidPhoneNumberMsg
        },
        required: [true, `sender ${requiredPhoneNumber}`],
    },
    receiver: {
        type: String,
        required: [true, `reciever ${requiredPhoneNumber}`],
        trim: true,
        validate: {
            validator: (phoneNumber) => {
                const regex = /^[0][7-9][0-1]\d{8}$/;
                const valid = regex.test(phoneNumber);
                return valid;
            },
            message: () => invalidPhoneNumberMsg
        },
    },
    message: {
        type: String,
        required: [true, `message ${isRequired}`],
        trim: true,
    },
    status: {
        type: String,
        trim: true,
        required: true,
        uppercase: true,
        default: 'SENT',
        enum: validSmsStatus
    },
}, {
    timestamps: true
});

SmsSchema.plugin(mongoosePaginate);

const SMS = model('SMS', SmsSchema);

export default SMS;
