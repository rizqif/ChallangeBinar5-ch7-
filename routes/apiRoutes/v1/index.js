import express from 'express';
import adminAPIRoute from './adminAPIRoute';
import authAPIRoute from './authAPIRoute';
import userAPIRoute from './userAPIRoute';
import gameAPIRoute from './gameAPIRoute';
import auth from '../../../middlewares/authentication';

const router = express.Router();

router.use('/admin', [auth.verifyToken], adminAPIRoute);
router.use('/auth', authAPIRoute);
router.use('/profile', [auth.verifyToken], userAPIRoute);
router.use('/game', [auth.verifyToken], gameAPIRoute);

export default router;
