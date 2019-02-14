import apiConstants from "../Constants/apiConstants";
import Storage from "../Storage";

const defaultHeaders = {
  client: "web",
};

export default {
  AUTH: {
    SIGNIN: {
      method: apiConstants.POST,
      url: `${apiConstants.URLs.BASE_URL}${apiConstants.URLs.AUTH.SIGNIN}`,
      headers: {
        [apiConstants.API_VERSION_HEADER]: apiConstants.API_VERSIONS.AUTH.SIGNIN,
        ...defaultHeaders,
      },
    },
    SIGNUP: {
      method: apiConstants.POST,
      url: `${apiConstants.URLs.BASE_URL}${apiConstants.URLs.AUTH.SIGNUP}`,
      headers: {
        [apiConstants.API_VERSION_HEADER]: apiConstants.API_VERSIONS.AUTH.SIGNUP,
        ...defaultHeaders,
      },
    },
    // REFRESH TOKENS
    // RESET PASSWORD
    // OTP
    // FORGOT PASSWORD
    // CHANGE PASSWORD
  },
  PRODUCT: async () => {
    const tokens = await Storage.getTokens();
    defaultHeaders[apiConstants.TOKEN_HEADERS.AUTHORIZATION] = tokens.token;
    return new Promise(res => {
      res({
        ADD: {
          method: apiConstants.POST,
          url: `${apiConstants.URLs.BASE_URL}${apiConstants.URLs.PRODUCT.ADD}`,
          headers: {
            [apiConstants.API_VERSION_HEADER]: apiConstants.API_VERSIONS.PRODUCT.ADD,
            ...defaultHeaders,
          },
        },
        GET_ALL: {
          method: apiConstants.GET,
          url: `${apiConstants.URLs.BASE_URL}${apiConstants.URLs.PRODUCT.GET_ALL}`,
          headers: {
            [apiConstants.API_VERSION_HEADER]: apiConstants.API_VERSIONS.PRODUCT.UPDATE,
            ...defaultHeaders,
          },
        },
        DELETE: {
          method: apiConstants.POST,
          url: `${apiConstants.URLs.BASE_URL}${apiConstants.URLs.PRODUCT.DELETE}`,
          headers: {
            [apiConstants.API_VERSION_HEADER]: apiConstants.API_VERSIONS.PRODUCT.DELETE,
            ...defaultHeaders,
          },
        },
        UPDATE: {
          headers: {
            [apiConstants.API_VERSION_HEADER]: apiConstants.API_VERSIONS.PRODUCT.UPDATE,
            ...defaultHeaders,
          },
        },
      });
    });
  },
  // DELETE PRODUCT
  // UPDATE PRODUCT
};
