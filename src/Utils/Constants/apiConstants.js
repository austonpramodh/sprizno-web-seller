const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://api.ipsimata.in/seller/";
  }
  // return "http://localhost:5000/seller/";
  return "http://192.168.1.4:5000/seller/";
};

export default {
  URLs: {
    BASE_URL: getBaseUrl(),
    // BASE_URL: "https://sprizno-api.azurewebsites.net/seller/",
    // BASE_URL: "https://api.ipsimata.in/seller/",
    IMAGE_CONTAINER_URL: "https://spriznostorage.blob.core.windows.net/imagecontainer/",
    AUTH: {
      SIGNIN: "auth/signin",
      SIGNUP: "auth/signup",
      REFRESH_TOKENS: "auth/refreshtokens",
      SAS_TOKEN: "sastoken",
    },
    PRODUCT: {
      ADD: "product/add",
      GET_ALL: "product/getall",
      DELETE: "product/delete",
    },
  },
  POST: "post",
  GET: "get",
  PUT: "put",
  API_VERSION_HEADER: "api-version",
  API_VERSIONS: {
    AUTH: { SIGNIN: "1.0.0", SIGNUP: "1.0.0", REFRESH_TOKENS: "1.0.0" },
    PRODUCT: {
      ADD: "1.0.0",
      GET_ALL: "1.0.0",
      DELETE: "1.0.0",
      SAS_TOKEN: "1.0.0",
    },
  },
  TOKEN_HEADERS: {
    AUTHORIZATION: "authorization",
  },
};
