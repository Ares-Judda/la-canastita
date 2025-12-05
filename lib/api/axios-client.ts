import axios from "axios";

export const useAxiosApi = () => {
    const api = axios.create({
        baseURL: "http://localhost:8085/api",
    });
    return api;
};