import jwt from "jsonwebtoken";

const isTokenValid = token => {
  const decoded = jwt.decode(token);
  const time = Math.floor(Date.now() / 1000);
  if (decoded.exp < time) {
    return false;
  }
  return true;
};

export default { isTokenValid };
