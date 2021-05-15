import * as BaseApi from "./BaseApi";

export const Login = ({email, password}: any): Promise<any> => {
    return BaseApi.postApi("/auth/login", {email: email, password: password});
}

export const Register = ({fullName, email, password}: any): Promise<any> => {
    return BaseApi.postApi("/auth/register", {fullName: fullName, email: email, password: password});
}
