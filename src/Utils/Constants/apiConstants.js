export default {
  URLs: {
    // BASE_URL: "http://localhost:5000/seller/",
    // BASE_URL: "https://sprizno-api.azurewebsites.net/seller/",
    BASE_URL: "https://api.ipsimata.in/seller/",
    AUTH: { SIGNIN: "auth/signin", SIGNUP: "auth/signup", REFRESH_TOKENS: "auth/refreshtokens" },
    PRODUCT: {
      ADD: "product/add",
      GET_ALL: "product/getall",
      DELETE: "product/delete",
    },
  },
  POST: "post",
  GET: "get",
  API_VERSION_HEADER: "api-version",
  API_VERSIONS: {
    AUTH: { SIGNIN: "1.0.0", SIGNUP: "1.0.0", REFRESH_TOKENS: "1.0.0" },
    PRODUCT: {
      ADD: "1.0.0",
      GET_ALL: "1.0.0",
      DELETE: "1.0.0",
    },
  },
  TOKEN_HEADERS: {
    AUTHORIZATION: "authorization",
  },
};
