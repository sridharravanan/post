import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  SUBMIT_POST_REQUEST,
  SUBMIT_POST_FAILURE
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

export type FetchPostSuccess = {
  type: typeof FETCH_POST_SUCCESS;
  payload: FetchPostSuccessPayload;
};

export type FetchPostFailure = {
  type: typeof FETCH_POST_FAILURE;
  payload: FetchPostFailurePayload;
};

export type PostActions =
  | FetchPostRequest
  | FetchPostSuccess
  | FetchPostFailure;



//#submit
export interface SubmitPostState {
  pending: boolean;
  post: IPost;
  error: string | null;
}


export interface SubmitPostRequest {
  type: typeof SUBMIT_POST_REQUEST;
}
export interface SubmitPostSuccessPayload {
  post: IPost;
}
export type SubmitPostSuccess = {
  type: typeof FETCH_POST_FAILURE;
  payload: FetchPostFailurePayload;
};


export type SubmitPostFailure = {
  type: typeof SUBMIT_POST_FAILURE;
  payload: FetchPostFailurePayload;
};

export type SubmitActions =
  | SubmitPostRequest
  | SubmitPostSuccess
  | SubmitPostFailure;