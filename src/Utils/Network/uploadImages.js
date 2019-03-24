import Axios from "axios";
import api from "./api";
import request from "./request";

const uuidv1 = require("uuid/v1");

const uploadImages = async files =>
  new Promise(async resolve => {
    const sasTokenParams = api.AUTH.SAS_TOKEN;
    const sasTokenResponse = await request(sasTokenParams);
    if (sasTokenResponse.success === false) {
      resolve(sasTokenResponse);
      return null;
    }
    const { sasToken } = sasTokenResponse;
    const params = api.PRODUCT.UPLOAD_IMAGES;
    const { URL, CONTAINER_NAME, SAS_STRING } = sasToken;
    const re = /(?:\.([^.]+))?$/;
    const allPromises = await Promise.all(
      files.map(
        file =>
          new Promise(async resolve1 => {
            // eslint-disable-next-line no-undef
            const reader = new FileReader();
            reader.onload = async () => {
              const blobName = `${uuidv1()}.${re.exec(file.name)[1]}`;
              params.url = `${URL}${CONTAINER_NAME}/${blobName}?${SAS_STRING}`;
              params.headers = {
                ...params.headers,
                "content-type": file.type,
              };
              const arrayBuffer = reader.result;
              params.data = arrayBuffer;
              const fileResponse = await Axios(params);
              if (fileResponse.status === 201) {
                resolve1(blobName);
              }
            };
            reader.readAsArrayBuffer(file);
          }),
      ),
    );
    resolve(allPromises);
    return null;
  });

export default uploadImages;
