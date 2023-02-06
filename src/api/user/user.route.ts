import { Router } from 'express';
import {
    getAllUsersHandler,
    getMeHandler
} from './user.controller';
import { deserializeUser } from '../../middleware/deserializeUser';
import { requireUser } from '../../middleware/requireUser';
import { restrictTo } from '../../middleware/restrictTo';

const router = Router();
router.use(deserializeUser, requireUser);

// Only the admin can get all users
router.get('/', restrictTo('admin'), getAllUsersHandler);
// Get current logged in user info
router.get('/me', getMeHandler);

export default router;