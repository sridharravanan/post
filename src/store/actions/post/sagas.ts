import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { deletePostSuccess, fetchPostFailure, fetchPostSuccess, submitPostFailure, submitPostSuccess } from "./actions";
import { FETCH_POST_REQUEST, SUBMIT_POST_REQUEST,DELETE_POST_REQUEST } from "./actionType";
import { IPost, SubmitPostRequest,DeletePostRequest } from "./type";
import { appUrl,defaultErrorMessage,successHttpCodes } from '../../../config/constant'


// AXIOS
const axiosClient = axios;
axiosClient.defaults.baseURL = appUrl;


const getPosts = () =>
  axiosClient.get('/posts');
//axios.get<IPost[]>(appUrl + '/posts');
function getErrorMessage(response:any){
  const responseError = response?.data?.error ? response?.data?.error : null;
    const responseMsg = response?.data?.message ? response?.data?.message : null;
    const unhandleErrorMsg = response?.message ? response?.message : null;
    return responseError || responseMsg || unhandleErrorMsg || defaultErrorMessage;
}
/*
  Worker Saga: Fired on FETCH_POST_REQUEST action
*/
function* fetchPostSaga(): any {
  try {
    let responce = yield call(getPosts);
    if(successHttpCodes.includes(responce.status)){
      yield put(
        fetchPostSuccess({
          posts: responce.data,
        })
      );
    }else{
      yield put(fetchPostFailure({ error: getErrorMessage(responce)}));    
    }
  } catch (e) {
    yield put(fetchPostFailure({ error: getErrorMessage(e)}));    
  }
}
const insertPostsAsync = async (body: IPost) => {
  if (body && body.id) {
    return axiosClient.put(
      '/posts/' + body.id,
      body
    )
  }
  return axiosClient.post(
    '/posts',
    body
  )
}
function* insertPostSaga(action: SubmitPostRequest):any {
  try {
    let responce = yield call(insertPostsAsync, action.args);
    // if(successHttpCodes.includes(responce.status)){
    //   yield put(submitPostSuccess());
    // }else{
    //   yield put(submitPostFailure({ error: getErrorMessage(responce)}));
    // }
    // yield put(submitPostFailure({ error: getErrorMessage(responce)}));
  } catch (ex: any) {
    // yield put(submitPostFailure({ error: getErrorMessage(ex)}));    
  }
};
const deletePostAsync = async (id: Number) => {
  return axiosClient.delete(
    '/posts/'+id
  );
};
/**
 * 
 * @param action {type, payload: string[]}
 */
 function* deletePostSaga(action:DeletePostRequest):any {
  try {

      let responce = yield call(deletePostAsync, action.args);
      if(successHttpCodes.includes(responce.status)){
        yield put(deletePostSuccess());
      }else{
        yield put(fetchPostFailure({ error: getErrorMessage(responce)}));
      }

  } catch(error: any) {
      let errorMessage = getErrorMessage(error);
      yield put(fetchPostFailure({ error: errorMessage}));
  }
};
/*
  Starts worker saga on latest dispatched `FETCH_POST_REQUEST` action.
  Allows concurrent increments.
*/
function* postSaga() {
  yield all([takeLatest(FETCH_POST_REQUEST, fetchPostSaga)]);
  yield all([takeLatest(SUBMIT_POST_REQUEST, insertPostSaga)]);
  yield all([takeLatest(DELETE_POST_REQUEST, deletePostSaga)]);
}

export default postSaga;