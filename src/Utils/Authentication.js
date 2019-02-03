import jwt from "jsonwebtoken";
import Storage from "./Storage";

const Authentication = {
  authenticate: (tokens, cb) => {
    // console.log("authentication hit");
    // get tokens and store
    Storage.storeTokens(tokens, cb);
  },
  isAuthenticated: cb => {
    Storage.getTokens((err, tokens) => {
      // console.log("error", err, "tokens", tokens);
      if (err) {
        cb(err, false);
      } else {
        const { token, refreshToken } = tokens;
        // console.log("hello world Token raw", token);
        if (token) {
          const decodedToken = jwt.decode(token);
          if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
            // console.log("token Valid", Math.floor(Date.now() / 1000), decodedToken.exp);
            cb(err, true);
          } else if (refreshToken) {
            const decodedRefreshToken = jwt.decode(refreshToken);
            if ((decodedRefreshToken > Math.floor(Date.now() / 1000), decodedToken.exp)) {
              // console.log("refreshtoken valid");
              // --------------------important---------------------------refresh both tokens
              cb(err, true);
            } else {
              // console.log("refreshToken invalid");
              cb(err, false);
            }
          }
        } else cb(err, false);
      }
    });
  },
  logout: () => {
    Storage.deleteTokens();
    // console.log("Storage Cleared");
  },
};

export default Authentication;
