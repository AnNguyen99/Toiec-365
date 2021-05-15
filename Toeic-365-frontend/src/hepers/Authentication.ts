import cookie from "js-cookie";

const TOKEN_KEY: string = "TOKEN_KEY";
const USER_INFO: string = "USER_INFO";

export const setCookie = (key: string, value: any) => {
    return cookie.set(key, value);
}

export const getCookie = (key: string) => {
    return cookie.get(key);
}

export const removeCookie = (key: string) => {
    return cookie.remove(key);
}

export const setLocalStorage = (key: string, value: any) => {
    return localStorage.setItem(key, value);
}

export const getLocalStorage = (key: string) => {
    return localStorage.getItem(key);
}

export const removeLocalStorage = (key: string) => {
    return localStorage.removeItem(key);
}

export const saveUserAndToken = (res: any) => {
    setCookie(TOKEN_KEY, res.data.token);
    setLocalStorage(USER_INFO, JSON.stringify(res.data.userInfo));
}

export const isAuth = () => {
    const cookieChecked = getCookie(TOKEN_KEY);
    if (cookieChecked) {
        if (localStorage.getItem(USER_INFO)) {
            // @ts-ignore
            return JSON.parse(localStorage.getItem(USER_INFO));
        } else {
            return false;
        }
    }
}

export const logout = () => {
    removeCookie(TOKEN_KEY);
    removeLocalStorage(USER_INFO);
}


