import {
    FETCH_POST_REQUEST,
    FETCH_POST_FAILURE,
    FETCH_POST_SUCCESS,
  } from "./actionType";
  import {
    FetchPostRequest,
    FetchPostSuccess,
    FetchPostSuccessPayload,
    FetchPostFailure,
    FetchPostFailurePayload,
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