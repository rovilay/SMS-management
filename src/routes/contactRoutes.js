import express from 'express';

import { contactApiPrefix } from '../helpers/defaults';
import { authenticate } from '../middlewares/auth';
import contactController from '../controllers/Contact';

const contactRoutes = express.Router();

contactRoutes.post(`${contactApiPrefix}/signup`, contactController.createContact);

contactRoutes.post(`${contactApiPrefix}/signin`, contactController.loginContact);

contactRoutes.get(
    `${contactApiPrefix}/:id`,
    authenticate,
    contactController.getContact
);

contactRoutes.delete(
    `${contactApiPrefix}/delete`,
    authenticate,
    contactController.deleteContact
);

export default contactRoutes;
