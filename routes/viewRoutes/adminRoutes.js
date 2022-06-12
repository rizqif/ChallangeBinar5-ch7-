import express from 'express';
import adminController from '../../controllers/ViewController/adminController';

const router = express.Router();

router.get('/userlist', adminController.getUserlist);
router.patch('/promote', adminController.promote);
router.patch('/demote', adminController.demote);
router.delete('/deleteUser', adminController.deleteUser);

export default router;
