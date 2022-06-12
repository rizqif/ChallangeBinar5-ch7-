import fetch from 'node-fetch';

class userController {
  static getProfile = async (req, res) => {
    await fetch(`http://${process.env.URL}/api/v1/profile/${req.decoded.userId}`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `${req.cookies.access_token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 403) {
          return res.render('changePassword', {
            title: 'Change Password', login: true, username: req.cookies.username || '', validateError: data.message,
          });
        }
        if (data.status === 200) {
          return res.render('profile', {
            // eslint-disable-next-line max-len
            title: req.cookies.username, login: true, user: data.profile, username: req.cookies.username,
          });
        }
        return res.render('profile', { title: 'Profile', login: true, username: req.cookies.username || '' });
      })
      .catch((e) => console.log(e));
  };

  static getEditProfile = async (req, res) => res.render('editProfile', {
    title: 'Edit Profile', login: true, username: req.cookies.username || '', validateError: '',
  });

  static getChangePassword = (req, res) => res.render('changePassword', {
    title: 'Change Password', login: true, username: req.cookies.username || '', validateError: '',
  });

  static patchEditProfile = async (req, res) => {
    await fetch(`http://${process.env.URL}/api/v1/profile/edit/${req.decoded.userId}`, { method: 'PATCH', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json', Authorization: `${req.cookies.access_token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.redirect('/profile');
        }
        return res.redirect('/profile/edit');
      })
      .catch((e) => console.log(e));
  };

  static patchChangePassword = async (req, res) => {
    await fetch(`http://${process.env.URL}/api/v1/profile/changePassword/${req.decoded.userId}`, { method: 'PATCH', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json', Authorization: `${req.cookies.access_token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.redirect('/profile');
        }
        return res.render('changePassword', {
          title: 'Change Password', login: true, username: req.cookies.username || '', validateError: data.message,
        });
      })
      .catch((e) => console.log(e));
  };

  static deleteUser = async (req, res) => {
    await fetch(`http://${process.env.URL}/api/v1/profile/deleteUser`, { method: 'DELETE', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json', Authorization: `${req.cookies.access_token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          res.clearCookie('username');
          res.clearCookie(process.env.TOKEN_COOKIE);

          return res.render('login', { title: 'Login', login: false, validateError: '' });
        }
        return res.redirect('/profile');
      })
      .catch((e) => console.log(e));
  };
}

export default userController;
