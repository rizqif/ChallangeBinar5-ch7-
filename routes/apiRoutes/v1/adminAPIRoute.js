import express from 'express';
import adminAPIController from '../../../controllers/APIController/adminAPIController';

const router = express.Router();

router.get('/userlist', adminAPIController.getUserlist);
router.patch('/promote', adminAPIController.promote);
router.patch('/demote', adminAPIController.demote);

export default router;
