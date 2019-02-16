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

const getTokens = async cb => {
  const { keys } = storageConstants;
  const token = await Storage.getItem(keys.TOKEN);
  const refreshToken = await Storage.getItem(keys.REFRESH_TOKEN);
  if (cb) {
    cb(null, { token, refreshToken });
    return null;
  }
  return new Promise(res => {
    res({ token, refreshToken });
  });
  // return { token, refreshToken };
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
