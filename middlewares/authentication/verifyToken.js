import jwtAuth from './jwtAuth';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const TOKEN = authHeader.split(' ')[1] || authHeader.split('%20')[1];
    return jwtAuth.verify(
      TOKEN,
      (decoded) => {
        req.decoded = decoded;
        next();
      },
      () => res.status(500).json({ message: 'Internal Server Error.' }),
    );
  }
  return res.status(401).json({ message: 'Unauthorized.' });
};

export default verifyToken;
