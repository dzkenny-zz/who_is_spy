import Axios, { AxiosRequestConfig } from 'axios';

const instance = Axios.create({
    baseURL: '/',
    withCredentials: true
});

export const request = async (option: AxiosRequestConfig) => {
    const resp = await instance(option);
    return resp.data;
}