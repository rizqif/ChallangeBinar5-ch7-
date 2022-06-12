import express from 'express';
import userAPIController from '../../../controllers/APIController/userAPIController';

const router = express.Router();

router.get('/:id', userAPIController.getProfile);
router.patch('/edit/:id', userAPIController.patchEditProfile);
router.patch('/changePassword/:id', userAPIController.patchChangePassword);
router.delete('/deleteUser', userAPIController.deleteUser);

export default router;
