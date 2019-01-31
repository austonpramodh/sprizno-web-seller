import apiConstants from "../Constants/apiConstants";

export default {
  SIGNIN: {
    method: apiConstants.POST,
    url: `${apiConstants.URLs.BASE_URL}${apiConstants.URLs.SIGNIN}`,
    headers: {
      [apiConstants.API_VERSION_HEADER]: apiConstants.API_VERSIONS.SIGNIN,
    },
  },
};
