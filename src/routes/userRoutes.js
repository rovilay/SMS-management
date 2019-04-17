import express from 'express';

import { userApiPrefix } from '../helpers/defaults';
import { authenticate, authorize } from '../middlewares/auth';
import UserController from '../controllers/Users';

const userRoutes = express.Router();

userRoutes.post(`${userApiPrefix}/signup`, UserController.createUser);

userRoutes.post(`${userApiPrefix}/signin`, UserController.loginUser);

// userRoutes.use(`${userApiPrefix}`, authenticate);
// protected routes should go here
userRoutes.get(
    `${userApiPrefix}`,
    authenticate,
    authorize(['SUPER_ADMIN']),
    UserController.getAllUsers
);

userRoutes.get(
    `${userApiPrefix}/:id`,
    authenticate,
    authorize(['SUPER_ADMIN', 'ADMIN', 'USER']),
    UserController.getUser
);

userRoutes.put(
    `${userApiPrefix}/:id/role`,
    authenticate,
    authorize(['SUPER_ADMIN']),
    UserController.updateUserRole
);

export default userRoutes;
