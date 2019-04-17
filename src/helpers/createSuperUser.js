/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
import dotenv from 'dotenv';

import User from '../models/User';

dotenv.config();

const name = process.env.SUPER_USER_NAME;
const phoneNumber = process.env.SUPER_USER_PHONE_NUMBER;
const password = process.env.SUPER_USER_PASSWORD;
const role = process.env.SUPER_USER_ROLE;

const createSuperUser = async () => {
    const query = User.findOne({ phoneNumber });
    await query.exec((err, res) => {
        if (err) return console.log(err);
        if (!res) {
            console.log('creating super admin...');
            const superAdmin = new User({
                name, phoneNumber, role, password
            });

            superAdmin.save((err, res) => {
                if (err) return console.log('super admin creation error', err);

                console.log('super admin created!');
            });
        }
    });
};

export default createSuperUser;
