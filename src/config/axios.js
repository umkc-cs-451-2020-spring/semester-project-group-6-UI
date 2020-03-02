import axios from "axios";
import {API_ROOT}   from "./api";

export const axiosInstance = axios.create({
    baseURL: API_ROOT,
    reponseType : "json",
    headers : {"content-type" : "application/json"}
});

//This interceptor will run before every request is sent
//Helpful for adding security & token fetch
axiosInstance.interceptors.request.use(
    config => {
        config.headers = {...config.headers};
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)