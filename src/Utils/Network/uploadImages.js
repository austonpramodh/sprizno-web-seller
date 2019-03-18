import Axios from "axios";
import api from "./api";
import request from "./request";

const uuidv1 = require("uuid/v1");

const uploadImages = async files =>
  new Promise(async resolve => {
    const sasTokenParams = api.AUTH.SAS_TOKEN;
    const sasTokenResponse = await request(sasTokenParams);
    const { sasToken } = sasTokenResponse.data;
    const fileNames = [];
    const params = api.PRODUCT.UPLOAD_IMAGES;
    const { URL, CONTAINER_NAME, SAS_STRING } = sasToken;
    const re = /(?:\.([^.]+))?$/;
    files.map(file => {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
      const blobName = `${uuidv1()}.${re.exec(file.name)[1]}`;
      params.url = `${URL}${CONTAINER_NAME}/${blobName}?${SAS_STRING}`;
      params.headers = {
        ...params.headers,
        "content-type": file.type,
      };
      reader.onload = async () => {
        const arrayBuffer = reader.result;
        params.data = arrayBuffer;
        const fileResponse = await Axios(params);
        if (fileResponse.status === 201) {
          fileNames.push(blobName);
          if (files.length === fileNames.length) {
            resolve(fileNames);
          }
        }
      };
      reader.readAsArrayBuffer(file);
      return null;
    });
  });

export default uploadImages;
