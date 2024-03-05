import axios from "axios";
import config from "../../config";

const request = axios.create({
  baseURL: config.API_ROOT,
  params: {},
});

export { request };
