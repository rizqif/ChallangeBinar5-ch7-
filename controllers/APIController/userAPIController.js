import bcrypt from 'bcrypt';
import { userGames, userGameBiodata } from '../../models';

class userController {
  static getProfile = async (req, res) => {
    try {
      return await userGameBiodata.findOne({
        attributes: ['name', 'gender', 'dob', 'status'],
        where: { userId: req.params.id },
        include: [
          {
            model: userGames,
            attributes: ['userId', 'username', 'email'],
          },
        ],
      }).then((profile) => {
        if (profile) return res.status(200).json({ status: 200, message: 'Success', profile });
        return res.status(404).json({ status: 404, message: 'Data not found.' });
      })
        .catch((error) => res.status(500).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };

  static patchEditProfile = async (req, res) => {
    try {
      const { name, status, gender } = req.body;
      let { dob } = req.body;

      if (!dob) dob = null;

      return await userGameBiodata.findOne({
        where: { userId: req.params.id },
      })
        .then((user) => {
          if (name) { user.update({ name }); }
          if (gender) { user.update({ gender }); }
          if (dob) { user.update({ dob }); }
          if (status) { user.update({ status }); }
          return res.status(200).json({ status: 200, message: `Profile ${req.params.id} edited`, user });
        })
        .catch((error) => res.status(500).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };

  static patchChangePassword = async (req, res) => {
    try {
      const { oldPassword, password } = req.body;

      if (oldPassword === password) {
        return res.status(400).json({ status: 400, message: 'New password should not be the same as old password.' });
      }

      // Get user data - required for checking old password
      const user = await userGames.findOne({
        where: { userId: req.params.id },
      });

      // Check password from username and compare
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ status: 400, message: 'Password is wrong.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      if (isValidPassword && password) {
        return await user.update({ password: hashedPassword })
          .then(() => res.status(200).json({ status: 200, message: 'Password changed.' }))
          .catch((error) => res.status(500).json({ error: error.name }));
      }
      return res.status(500);
    } catch {
      return res.status(500).json({ status: 500, message: 'Failed to change password' });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      return await userGames.destroy({ where: { userId: req.body.userId } })
        .then((user) => {
          if (user) return res.status(200).json({ status: 200, message: `User ${req.body.userId} data deleted.` });
          return res.status(404).json({ status: 404, message: 'Data not found.' });
        })
        .catch((error) => res.status(500).json({ error: error.name }));
    } catch {
      return res.status(403).json({ status: 403, message: 'Failed to delete user data.' });
    }
  };
}

export default userController;
