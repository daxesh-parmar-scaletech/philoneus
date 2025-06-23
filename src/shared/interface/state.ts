export interface IState {
  loading: ILoadingState;
}

export interface ILoadingState {
  api: {
    [key: string]: boolean;
  };
}

export interface IAction {
  type: string;
  payload: any;
}
