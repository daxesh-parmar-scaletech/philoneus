import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';

export const API_CONFIG = {
    login: 'auth/login',
    workshops: 'workshops',
    logout: 'logout',
};

export const getUrl = (url: string, params: any = {}): string => {
    Object.keys(params).forEach((key) => (params[key] == null || params[key] === '') && delete params[key]);
    let urlString = `${url}`;
    if (params && !isEmpty(params)) {
        urlString += `?${queryString.stringify(params)}`;
    }
    return urlString;
};
