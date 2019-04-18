/* eslint max-len: 0 */
export const apiPrefix = '/api/v1';
export const smsApiPrefix = '/sms';
export const contactApiPrefix = '/contacts';
export const appWelcomeMsg = 'Welcome to sms management app';
export const nonExistingRouteMsg = 'route do not exist!';
export const defaultSuccessMsg = '0peration successful';
export const genericErrorMessage = 'something went wrong';
export const allowedUserRoles = ['ADMIN', 'SUPER_ADMIN', 'USER'];
const validPhoneNumberPrefix = ['070', '071', '080', '081', '090', '091'];
export const invalidPhoneNumberMsg = `phone number must be eleven digits, and start with any of ${validPhoneNumberPrefix}`;
export const unAuthorizedMessage = 'user not authorized to perform this operation';
export const unavailablePhoneNumber = 'phone number is unavailable';
export const unavailableContact = 'contact does not exist';
export const invalidCredentials = 'invalid credentials';
export const invalidToken = 'Token is invalid';
export const tokenRequired = 'Token is required';
