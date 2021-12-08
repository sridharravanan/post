import {
    FETCH_POST_REQUEST,
    FETCH_POST_FAILURE,
    FETCH_POST_SUCCESS,
    SUBMIT_POST_REQUEST,
    SUBMIT_POST_SUCCESS,
    SUBMIT_POST_FAILURE
  } from "./actionType";
  import {
    FetchPostRequest,
    FetchPostSuccess,
    FetchPostSuccessPayload,
    FetchPostFailure,
    FetchPostFailurePayload,
    SubmitPostRequest,
    IPost,
    SubmitPostSuccess,
    SubmitPostFailure
  } from "./type";
  
  export const fetchPostRequest = (): FetchPostRequest => ({
    type: FETCH_POST_REQUEST,
  });
  
  export const fetchPostSuccess = (
    payload: FetchPostSuccessPayload
  ): FetchPostSuccess => ({
    type: FETCH_POST_SUCCESS,
    payload,
  });
  
  export const fetchPostFailure = (payload: FetchPostFailurePayload): FetchPostFailure => ({
    type: FETCH_POST_FAILURE,
    payload,
  });

  export const submitPostRequest = (args: IPost): SubmitPostRequest => ({
    type: SUBMIT_POST_REQUEST,
    args,
  });
  
  export const submitPostSuccess = (): SubmitPostSuccess => ({
    type: SUBMIT_POST_SUCCESS,
  });
  
  export const submitPostFailure = (payload: FetchPostFailurePayload): SubmitPostFailure => ({
    type: SUBMIT_POST_FAILURE,
    payload,
  });
  