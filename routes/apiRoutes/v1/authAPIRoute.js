import express from 'express';
import authAPIController from '../../../controllers/APIController/authAPIController';
import auth from '../../../middlewares/authentication';

const router = express.Router();

router.post('/signup', authAPIController.postSignup);

router.post('/login', authAPIController.postLogin);

router.delete('/logout/:id', [auth.verifyToken], authAPIController.logout);

export default router;
