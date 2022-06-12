import jwt from 'jsonwebtoken';

export default class jwtAuth {
  static DEFAULT_OPTIONS = {
    algorithm: 'HS256',
    expiresIn: 7200,
  }

  static sign = (payload, success, error) => jwt.sign(
    payload,
    process.env.JWT_SECRET,
    this.DEFAULT_OPTIONS,
    (e, token) => {
      if (e) return error(e);
      return success(token);
    },
  )

  static verify = (token, success, error) => jwt.verify(
    token,
    process.env.JWT_SECRET,
    (e, decoded) => {
      if (e) return error(e);
      return success(decoded);
    },
  )
}
