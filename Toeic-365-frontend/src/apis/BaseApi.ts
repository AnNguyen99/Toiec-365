import axios from "axios";
import cookie from "js-cookie";

//variable
const TOKEN_KEY: string = "TOKEN_KEY";
const DEV_API_URI: string = "http://localhost:8081";
const PRODUCT_API_URI: string = "https://toeic365-test.herokuapp.com";

export const baseUrl = () => {
    return DEV_API_URI;
}

export const isEmptyObject = (object: any) => {
    return (Object.keys(object).length === 0 || !object.Authorization);
}

export const authHeader = () => {
    if (cookie.get(TOKEN_KEY)) {
        return {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*",
            Authorization: "Bearer " + cookie.get(TOKEN_KEY)
        };
    } else {
        return {};
    }
}

// get api
export const getApi = (path: string, params: object): Promise<any> => {
    const headers = authHeader();
    if (!isEmptyObject(headers)) {
        return axios.get(baseUrl() + path, { headers: headers, params: params });
    }
    return axios.get(baseUrl() + path, { params: params });
}

export const postApi = (path: string, body: object): Promise<object> => {
    const headers = authHeader();
    if (!isEmptyObject(headers)) {
        return axios.post(baseUrl() + path, body, { headers: headers });
    }
    return axios.post(baseUrl() + path, body);
}

export const putApi = (path: string, params: object, body: object): Promise<any> => {
    const headers = authHeader();
    if (!isEmptyObject(headers)) {
        return axios.put(baseUrl() + path, body, { headers: headers, params: params });
    }
    return axios.put(baseUrl() + path, params);
}

export const deleteApi = (path: string, params: object): Promise<any> => {
    const headers = authHeader();
    if (!isEmptyObject(headers)) {
        return axios.delete(baseUrl() + path, { data: params, headers: headers });
    }
    return axios.delete(baseUrl() + path, { data: params });
}






