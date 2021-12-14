import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  SUBMIT_POST_REQUEST,
  SUBMIT_POST_FAILURE,
  SUBMIT_POST_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  FETCH_POST_RESET
} from "./actionType";

export interface IPost {
  userId?: number;
  id?: number;
  title: string;
  body: string;
}

//#list
export interface PostState {
  pending: boolean;
  posts: IPost[];
  error: string | null;
  isDeleted:boolean;
}

export interface FetchPostSuccessPayload {
  posts: IPost[];
}

export interface FetchPostFailurePayload {
  error: string;
}


export interface FetchPostRequest {
  type: typeof FETCH_POST_REQUEST;
}
export interface FetchPostReset {
  type: typeof FETCH_POST_RESET;
}
export type FetchPostSuccess = {
  type: typeof FETCH_POST_SUCCESS;
  payload: FetchPostSuccessPayload;
};

export type FetchPostFailure = {
  type: typeof FETCH_POST_FAILURE;
  payload: FetchPostFailurePayload;
};




//#submit
export interface SubmitPostState {
  pending: boolean;
  post: IPost;
  error: string | null;
}


export interface SubmitPostRequest {
  type: typeof SUBMIT_POST_REQUEST;
  args: IPost,
}
export type SubmitPostSuccess = {
  type: typeof SUBMIT_POST_SUCCESS;
};


export type SubmitPostFailure = {
  type: typeof SUBMIT_POST_FAILURE;
  payload: FetchPostFailurePayload;
};


export type SubmitActions =
  | SubmitPostRequest
  | SubmitPostSuccess
  | SubmitPostFailure;

  export interface DeletePostRequest {
    type: typeof DELETE_POST_REQUEST;
    args: Number,
  }
  export type DeletePostSuccess = {
    type: typeof DELETE_POST_SUCCESS;
  };
  
  
  export type DeletePostFailure = {
    type: typeof DELETE_POST_FAILURE;
    payload: FetchPostFailurePayload;
  };

  export type PostActions =
  | FetchPostRequest
  | FetchPostSuccess
  | FetchPostFailure
  | DeletePostRequest
  | DeletePostSuccess
  | DeletePostFailure
  | FetchPostReset;
