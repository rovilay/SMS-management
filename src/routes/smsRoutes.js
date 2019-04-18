import express from 'express';

import { smsApiPrefix } from '../helpers/defaults';
import { authenticate } from '../middlewares/auth';
import smsController from '../controllers/Sms';
import validateSmsQuery from '../middlewares/validateSmsQuery';

const smsRoutes = express.Router();

smsRoutes.post(
    `${smsApiPrefix}/:phoneNumber`,
    authenticate,
    smsController.createSms
);

smsRoutes.get(
    `${smsApiPrefix}`,
    authenticate,
    validateSmsQuery,
    smsController.getSms
);

smsRoutes.put(
    `${smsApiPrefix}/:smsId`,
    authenticate,
    smsController.updateSmsStatus
);

export default smsRoutes;
