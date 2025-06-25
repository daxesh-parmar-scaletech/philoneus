export interface IResponseObject<T> {
    is_error: boolean;
    message: string;
    data: T;
}

export interface IListResponse<T> {
    count: number;
    pageCount: number;
    data: T;
}

export interface ISortData {
    order_by?: string;
    sort_by?: OrderType;
}

export type OrderType = 'ASC' | 'DESC';

export interface IUserData {
    token: string;
    user: UserData;
}

export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    tenantId: string;
}

export type AnyObject = {
    [key: string]: any;
};
