import express from 'express';
import gameController from '../../controllers/ViewController/gameController';

const router = express.Router();

router.get('/', gameController.play);
router.get('/singleplayer', gameController.singlePlayer);

router.get('/room', gameController.getRoom);
router.get('/room/:roomId', gameController.enterRoomById);

// Game History
router.get('/history', gameController.getGameHistory);
router.post('/history', gameController.postGameHistory);
router.delete('/history', gameController.deleteGameHistory);

export default router;
