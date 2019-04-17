import User from '../models/User';

// eslint-disable-next-line max-len
export const verifyUserAndRole = (propertyToVerifyBy, propertyValue, roles) => new Promise((resolve) => {
    User.findOne({ [propertyToVerifyBy]: propertyValue })
        .exec((err, user) => {
            if (err || !user) return resolve(false);
            const valid = roles.includes(user.role);
            return resolve(valid);
        });
});

export default verifyUserAndRole;
