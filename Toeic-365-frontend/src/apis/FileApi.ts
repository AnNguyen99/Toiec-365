import * as BaseApi from "./BaseApi";
import axios from "axios";
import {baseUrl} from "./BaseApi";

export const uploadFile = (file: any): Promise<any> => {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post(`${baseUrl()}/upload-file`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
