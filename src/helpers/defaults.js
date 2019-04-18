/* eslint max-len: 0 */
export const apiPrefix = '/api/v1';
export const smsApiPrefix = '/sms';
export const contactApiPrefix = '/contacts';
export const appWelcomeMsg = 'Welcome to sms management app';
export const nonExistingRouteMsg = 'route does not exist!';
export const defaultSuccessMsg = '0peration successful';
export const genericErrorMessage = 'something went wrong';
export const unAuthorizedMessage = 'user not authorized to perform this operation';
export const unAuthroizedMessageV2 = 'user not authorized to perform this operation on this resource';
export const unavailablePhoneNumber = 'phone number is unavailable';
export const unavailableContact = 'contact does not exist';
export const invalidCredentials = 'invalid credentials';
export const invalidToken = 'Token is invalid';
export const tokenRequired = 'Token is required';
export const requiredPhoneNumber = 'phone number is required';
export const requiredName = 'name is required';
export const requiredId = 'id is required';
export const isRequired = 'is required';
export const smsNotFoundMsg = 'sms not found';
export const passwordError = 'password length must be greater than 6';
const validPhoneNumberPrefix = ['070', '071', '080', '081', '090', '091'];
export const invalidPhoneNumberMsg = `phone number must be eleven digits, and start with any of ${validPhoneNumberPrefix}`;
export const personalSmsErrorMsg = 'you cannot send sms to your phone number';
export const defaultPaginationLimit = 10;
export const defaultPaginationOffset = 0;
export const mustBeNumber = 'must be a whole number';
export const smsTypeError = 'type must either be sent or received';

// enums
export const validSmsStatus = ['SENT', 'RECEIVED'];
