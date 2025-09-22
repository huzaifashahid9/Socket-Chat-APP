export const BASE_URL = "http://localhost:5000/";
import axios from "axios";

export const apiHandle = axios.create({
  baseURL: BASE_URL,
});
