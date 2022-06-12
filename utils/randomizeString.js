const randomizeString = (length) => {
  let result = '';
  const ALPHANUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const LENGTH = ALPHANUM.length;
  for (let i = 0; i < length; i++) {
    result += ALPHANUM.charAt(Math.floor(Math.random() * LENGTH));
  }
  return result;
};

export default randomizeString;
