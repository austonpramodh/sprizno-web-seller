import localforage from "localforage";
import storageConstants from "./Constants/storageConstants";

// create instance
const Storage = localforage.createInstance(storageConstants.config);
const storeTokens = ({ token, refreshToken }, cb) => {
  const { keys } = storageConstants;
  Storage.setItem(keys.TOKEN, token, err => {
    if (err) {
      cb({ ...err, errCode: "4006" });
    } else {
      Storage.setItem(keys.REFRESH_TOKEN, refreshToken, err1 => {
        if (err1) {
          cb({ ...err1, errCode: "4006" });
        } else cb();
      });
    }
  });
};

const getTokens = cb => {
  const { keys } = storageConstants;
  Storage.getItem(keys.TOKEN, (err, token) => {
    if (err) {
      // call cb with err
      cb(err);
    } else {
      Storage.getItem(keys.REFRESH_TOKEN, (err1, refreshToken) => {
        if (err1) {
          // call cb with err
          cb(err);
        } else cb(err1, { token, refreshToken });
      });
    }
  });
};
const deleteTokens = () => {
  // const { Keys } = storageConstants;
  // console.log("STorage Cleared");
  Storage.clear();
};

export default {
  storeTokens,
  getTokens,
  deleteTokens,
};
