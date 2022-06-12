import express from 'express';
import auth from '../../middlewares/authentication';
import validation from '../../middlewares/validation';
import authController from '../../controllers/ViewController/authController';

const router = express.Router();

router.get('/signup', [auth.blockAuthenticated], authController.getSignup);
router.post('/signup', [auth.blockAuthenticated, validation.signupValidation], authController.postSignup);

router.get('/login', [auth.blockAuthenticated], authController.getLogin);
router.post('/login', [auth.blockAuthenticated, validation.loginValidation], authController.postLogin);

router.delete('/logout', [auth.verifyLogin], authController.logout);

export default router;
