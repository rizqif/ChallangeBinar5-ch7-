import { userGames } from '../../models';

// eslint-disable-next-line consistent-return
const onlyAdmin = async (req, res, next) => {
  try {
    await userGames.findOne({
      where: { userId: req.decoded.userId },
    }).then((user) => {
      if (user.roleRank === 1 || user.roleRank === 2) return next();
      return res.redirect('/');
    }).catch((e) => console.log(e));
  } catch {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};

export default onlyAdmin;
