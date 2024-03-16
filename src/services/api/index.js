import axios from "axios";
import config from "../../config.js";
import {useTelegram} from "../../hooks/useTelegram.jsx";
import {get} from "lodash";

const {user} = useTelegram()
const request = axios.create({
  baseURL: config.API_ROOT,
  params: {user_id: get(user,'id','926834986')},
});

export { request };
