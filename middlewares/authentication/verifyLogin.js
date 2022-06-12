import jwtAuth from './jwtAuth';

const verifyToken = (req, res, next) => {
  if (req.cookies.access_token) {
    const TOKEN = req.cookies.access_token.split(' ')[1];
    return jwtAuth.verify(
      TOKEN,
      (decoded) => {
        req.decoded = decoded;
        next();
      },
      () => res.redirect('/'),
    );
  }
  return res.redirect('/auth/login');
};

export default verifyToken;
