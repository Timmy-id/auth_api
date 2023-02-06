import { Router } from "express";
import {
    loginHandler, 
    registerHandler,
    refreshAccessTokenHandler,
    logoutHandler
} from './auth.controller';
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireUser } from "../../middleware/requireUser";
import { validate } from '../../middleware/validate';
import { createUserSchema, loginUserSchema } from '../user/user.schema';

const router = Router();

// User register route
router.post('/register', validate(createUserSchema), registerHandler);
// User login route
router.post('/login', validate(loginUserSchema), loginHandler);
// Refresh access token route
router.get('/refresh', refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);
// Logout user route
router.get('/logout', logoutHandler);

export default router;