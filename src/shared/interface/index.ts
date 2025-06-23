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
  id: string;
  name: string;
  email: string;
  token: string;
}

export type AnyObject = {
  [key: string]: any;
};
