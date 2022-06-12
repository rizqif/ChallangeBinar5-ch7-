import express from 'express';
import auth from '../middlewares/authentication';
import apiRouter from './apiRoutes';
import viewRoutes from './viewRoutes';
import controller from '../controllers/ViewController/controller';

const router = express.Router();

// Homepage router
router.get('/', [auth.verifyLogin], controller.index);
router.get('/index', (req, res) => {
  res.redirect('/');
});
router.get('/home', (req, res) => {
  res.redirect('/');
});

router.use(viewRoutes);
router.use('/api', apiRouter);

// 404 Page
router.use(controller.pageNotFound);

export default router;
