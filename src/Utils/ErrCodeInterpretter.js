import errCodes from "./Constants/errCodes";
import errMessagesContants from "./Constants/errMessagesConstants";

export default errCode => {
  let errMessage;
  switch (errCode) {
    case errCodes.USER_NOT_FOUND:
      errMessage = errMessagesContants.USER_NOT_FOUND;
      break;
    case errCodes.PASSWORD_INVALID:
      errMessage = errMessagesContants.PASSWORD_INVALID;
      break;
    case errCodes.USER_ALREADY_REGISTERED:
      errMessage = errMessagesContants.USER_ALREADY_REGISTERED;
      break;
    case errCodes.SERVER_DB_ERROR:
      errMessage = errMessagesContants.SERVER_DB_ERROR;
      break;
    case errCodes.SERVER_PASSWORD_MATCHING_ERROR:
      errMessage = errMessagesContants.SERVER_PASSWORD_MATCHING_ERROR;
      break;
    default:
      errMessage = errMessagesContants.DEFAULT;
  }
  return errMessage;
};
