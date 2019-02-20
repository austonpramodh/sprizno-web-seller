import Axios from "axios";
import TokenFunctions from "../tokenFunctions";
import Storage from "../Storage";
import apiConstants from "../Constants/apiConstants";
import API from "./api";
import Authentication from "../Authentication";

const request = async params =>
  new Promise(async resolve => {
    // check if token valid
    const tokens = await Storage.getTokens();
    if (TokenFunctions.isTokenValid(tokens.token)) {
      try {
        const response = await Axios({
          ...params,
          headers: { ...params.headers, [apiConstants.TOKEN_HEADERS.AUTHORIZATION]: tokens.token },
        });
        if (response.data) {
          resolve({ success: response.data.success, data: response.data });
        } else resolve({ success: false }); // server error
      } catch (error) {
        resolve({ ...error, success: false, errMessage: "Network Failure" });
      }
    } else if (TokenFunctions.isTokenValid(tokens.refreshToken)) {
      try {
        const refreshParams = API.AUTH.REFRESH_TOKENS;
        const refreshResponse = await Axios({
          ...refreshParams,
          headers: {
            ...refreshParams.headers,
            [apiConstants.TOKEN_HEADERS.AUTHORIZATION]: tokens.refreshToken,
          },
        });
        if (refreshResponse.data && refreshResponse.data.success) {
          const newTokens = refreshResponse.data.tokens;
          Storage.storeTokens(newTokens);
          // try to request and resolve
          try {
            const response = await Axios({
              ...params,
              headers: {
                ...params.headers,
                [apiConstants.TOKEN_HEADERS.AUTHORIZATION]: newTokens.token,
              },
            });
            if (response.data && response.data.sucess) {
              resolve({ success: "true", data: response.data });
            } else resolve({ success: false, data: response.data });
          } catch (error) {
            resolve({ ...error, success: false, errMessage: "Network Failure" });
          }
        } else if (refreshResponse.data && !refreshResponse.data.success) {
          // redirect
          Authentication.logout();
          // eslint-disable-next-line no-undef
          window.location.href = "/signin";
          // resolve({ success: false, redirect: true, errMessage: "User Logged Out" });
        }
      } catch (err) {
        resolve({ ...err, success: false, errMessage: "Network Error" });
      }
    } else {
      Authentication.logout();
      // eslint-disable-next-line no-undef
      window.location.href = "/signin";
      // redirect
      // resolve({ success: false, redirect: true, errMessage: "User Logged Out" });
    }
  });

export default request;
