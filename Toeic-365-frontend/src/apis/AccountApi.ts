import * as BaseApi from "./BaseApi";

export const getAllUser = (): Promise<any> => {
    return BaseApi.getApi("/api/users", {});
}

export const getCurrentUser = (): Promise<any> => {
    return BaseApi.getApi("/api/users/me", {});
}

export const updateUser = ({id, fullName,  password}: any): Promise<any> => {
    return BaseApi.postApi("/api/users/update", {id: id, fullName: fullName, password: password});
}

export const deleteUser = ({id}: any): Promise<any> => {
    return BaseApi.postApi("/api/users/delete", {id: id});
}

