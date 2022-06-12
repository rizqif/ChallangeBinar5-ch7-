import express from 'express';
import validation from '../../middlewares/validation';
import userController from '../../controllers/ViewController/userController';

const router = express.Router();

router.get('/', userController.getProfile);
router.get('/edit', userController.getEditProfile);
router.get('/changePassword', userController.getChangePassword);
router.patch('/edit', [validation.editProfileValidation], userController.patchEditProfile);
router.patch('/changePassword', [validation.changePasswordValidation], userController.patchChangePassword);
router.delete('/deleteUser', userController.deleteUser);

export default router;
