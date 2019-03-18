import apiConstants from "../Constants/apiConstants";

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
    REFRESH_TOKENS: {
      method: apiConstants.GET,
      url: `${apiConstants.URLs.BASE_URL}${apiConstants.URLs.AUTH.REFRESH_TOKENS}`,
      headers: {
        [apiConstants.API_VERSION_HEADER]: apiConstants.API_VERSIONS.AUTH.REFRESH_TOKENS,
        ...defaultHeaders,
      },
    },
    SAS_TOKEN: {
      method: apiConstants.GET,
      url: `${apiConstants.URLs.BASE_URL}${apiConstants.URLs.AUTH.SAS_TOKEN}`,
      headers: {
        ...defaultHeaders,
      },
    },
    // REFRESH TOKENS
    // RESET PASSWORD
    // OTP
    // FORGOT PASSWORD
    // CHANGE PASSWORD
  },
  PRODUCT: {
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
    UPLOAD_IMAGES: {
      method: apiConstants.PUT,
      headers: {
        "x-ms-blob-type": "BlockBlob",
      },
    },
  },
};
