import CryptoJS from 'crypto-js';
import { KEY } from 'shared/constants';
import { IUserData } from 'shared/interface';

/**
 * function to check if user is logged in or not
 */
const isLogin = () => {
    if (localStorage['authData']) {
        return true;
    } else {
        return false;
    }
};

/**
 * function to get authentication data
 */
const getAuthData = () => {
    try {
        const data = localStorage['authData'];
        if (data) {
            const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as IUserData;
            return decryptedData;
        } else {
            return {} as IUserData;
        }
    } catch (error) {
        console.error(error);
        return {} as IUserData;
    }
};

/**
 * function to set user authentication data
 */
const setAuthData = (data: IUserData): void => {
    const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), KEY);
    localStorage.setItem('authData', cipherText.toString());
};

/**
 * function to remove user authentication data
 */
const removeAuthData = (key = 'authData'): void => {
    localStorage.removeItem(key);
};

/**
 * function to get user access token
 */
const getAccessToken = (): string => {
    const data = getAuthData();
    if (data && data.token) {
        return data.token;
    } else {
        return '';
    }
};

const AuthService = {
    isLogin,
    getAccessToken,
    setAuthData,
    getAuthData,
    removeAuthData,
};

export default AuthService;
