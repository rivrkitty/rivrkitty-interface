import axios, { AxiosRequestHeaders } from "axios";

export const createHeaders = (): AxiosRequestHeaders => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

export const HOST_URL = process.env.REACT_APP_API_URL;

export const API = axios.create({
  baseURL: HOST_URL,
  headers: createHeaders(),
});
